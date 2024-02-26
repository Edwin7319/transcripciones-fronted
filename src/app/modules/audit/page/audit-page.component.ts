import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

import { AUDIT_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../constants/constants';
import { ITableColumn } from '../../../interfaces/interfaces';
import { LogRestService } from '../../home/page/log.rest.service';

const PAGE_TITLE: { [key: string]: string } = {
  registro_de_audio: 'Histórico de usuarios',
  actas: 'Histórico de actas',
};
@Component({
  selector: 'app-audit-page',
  templateUrl: './audit-page.component.html',
  styles: [],
})
export class AuditPageComponent implements OnInit {
  data: Array<any> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...AUDIT_TABLE_COLUMNS];
  pageTitle = '';

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _logRestService: LogRestService,
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(
        mergeMap((param) => {
          const tipo = param['tipo'];
          this.pageTitle = PAGE_TITLE[tipo];
          return this._logRestService.getAll(tipo);
        }),
      )
      .subscribe({
        next: (response) => {
          this.data = response.data;
        },
      });
  }

  protected readonly ROWS = ROWS;
  protected readonly ROWS_PAGINATION = ROWS_PAGINATION;
}
