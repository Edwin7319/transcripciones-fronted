import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { REPORT_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../../constants/constants';
import { ITableColumn } from '../../../../interfaces/interfaces';
import { AppStoreService } from '../../../../services/app-store.service';
import { LoaderService } from '../../../../services/loader.service';
import { IRecords, IRecordsForm } from '../../interface/records';
import { RecordsRestService } from '../../service/records.rest.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styles: [],
})
export class RecordsPageComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  data: Array<IRecords> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...REPORT_TABLE_COLUMNS];
  showCreateForm = false;
  inputFormData: IRecordsForm = { text: '', name: '' };
  fileId = '';
  recordingId = '';
  originalText = '';

  constructor(
    private readonly _loaderService: LoaderService,
    private readonly _appStore: AppStoreService,
    private readonly _recordsRestService: RecordsRestService,
  ) {}

  ngOnInit(): void {
    const store$ = this._appStore.store$.subscribe({
      next: (store) => {
        if (!store.transcriptionFileId) return;
        this.originalText = store.transcription;
        if (this.fileId !== store.transcriptionFileId) {
          this.loadInitData(store.transcriptionFileId);
        }
        this.fileId = store.transcriptionFileId;
      },
    });

    this.subscriptions.push(store$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  private loadInitData(fileId: string): void {
    const findAll$ = this._recordsRestService.getAll(fileId);

    findAll$.subscribe({
      next: (response) => {
        const { data, metadata } = response;
        this.data = data;
      },
    });
  }
  openCreateOrEditModal(rowData?: IRecords): void {
    this.showCreateForm = true;
    if (rowData) {
      this.inputFormData = {
        text: rowData.text,
        name: rowData.name,
      };
      this.recordingId = rowData._id;
      return;
    }
    this.inputFormData = {
      text: this.originalText,
      name: '',
    };
  }

  downloadWordFile(rowData: IRecords): void {}

  delete(rowData: IRecords): void {}

  cancelCreateForm() {
    this._loaderService.show();
    this.showCreateForm = false;
    this._loaderService.hidde();
  }

  createOrUpdateText(value: IRecordsForm) {
    let request$;

    if (this.recordingId) {
      request$ = this._recordsRestService.create(this.fileId, value);
    } else {
      request$ = this._recordsRestService.update(this.recordingId, value);
    }

    request$.subscribe({
      next: (response) => {
        this.data.unshift(response);
        this.showCreateForm = false;
      },
    });
  }
}
