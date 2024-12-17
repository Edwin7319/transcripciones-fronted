import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterMetadata } from 'primeng/api';
import { ColumnFilter, TableFilterEvent } from 'primeng/table';
import { mergeMap, Observable, tap } from 'rxjs';

import { AUDIT_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../constants/constants';
import { ITableColumn } from '../../../interfaces/interfaces';
import { LogRestService } from '../../home/page/log.rest.service';

const PAGE_TITLE: { [key: string]: string } = {
  registro_de_audio: 'Histórico de registro de audios',
  actas: 'Histórico de actas',
};
@Component({
  selector: 'app-audit-page',
  templateUrl: './audit-page.component.html',
})
export class AuditPageComponent implements OnInit {
  @ViewChildren(ColumnFilter) columnFilters!: QueryList<ColumnFilter>;

  data: Array<any> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...AUDIT_TABLE_COLUMNS];
  pageTitle = '';

  private pageIndex = 0;
  private tipo = '';
  private query = '';

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _logRestService: LogRestService,
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(
        mergeMap((param) => {
          this.tipo = param['tipo'];
          this.pageTitle = PAGE_TITLE[this.tipo];
          return this.getAudit();
        }),
      )
      .subscribe({
        next: (_) => ({}),
      });
  }

  private getAudit(pageIndex = 0, pageSize = this.rows, query = ''): Observable<any> {
    return this._logRestService.getAll(this.tipo, pageIndex, pageSize, query).pipe(
      tap((response) => {
        const [pagination] = response.metadata;
        this.data = response.data;
        this.totalRecords = pagination.total;
      }),
    );
  }

  pageChange(event: any): void {
    this.pageIndex = event.first;
    this.rows = event.rows;
    this.getAudit(this.pageIndex, this.rows, this.query).subscribe((_) => ({}));
  }

  changeCodeFilter(event: TableFilterEvent) {
    const { filters } = event;
    const { code, user } = filters || {};

    const codeQuery = (code as any[]) || [];
    const _codeQuery = codeQuery.map((q: FilterMetadata) => `code=${q.matchMode},${q.value || ''}`).join('&');

    const userQuery = (user as any[]) || [];
    const _userQuery = userQuery.map((q: FilterMetadata) => `user=${q.matchMode},${q.value || ''}`).join('&');

    this.query = `${_codeQuery}&${_userQuery}`;

    this.getAudit(this.pageIndex, this.rows, this.query).subscribe((_) => ({}));
  }
}
