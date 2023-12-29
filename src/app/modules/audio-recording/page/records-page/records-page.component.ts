import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

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
    private readonly _toaster: ToastrService,
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
        const { data } = response;
        this.data = data;
      },
    });
  }
  openCreateOrEditModal(rowData?: IRecords): void {
    this.showCreateForm = true;
    this.recordingId = rowData?._id || '';

    if (rowData) {
      this.inputFormData = {
        text: rowData.text,
        name: rowData.name,
      };
      return;
    }
    this.inputFormData = {
      text: this.originalText,
      name: '',
    };
  }

  downloadWordFile(rowData: IRecords): void {
    const download$ = this._recordsRestService.downloadDocxFile(rowData);

    download$.subscribe({
      next: () => {
        this._toaster.success('Documento generado de manera correcta', 'Éxito');
      },
    });
  }

  async delete(rowData: IRecords): Promise<void> {
    const response = await this.showConfirmModal(rowData);
    if (response.isDismissed) return;

    const delete$ = this._recordsRestService.delete(rowData._id);

    delete$.subscribe({
      next: () => {
        this.data = this.data.filter((d) => d._id !== rowData._id);
        this._toaster.success('Registro eliminado de manera correcta', 'Éxito');
      },
    });
  }

  cancelCreateForm() {
    this._loaderService.show();
    this.showCreateForm = false;
    this._loaderService.hidde();
  }

  createOrUpdateText(value: IRecordsForm) {
    let request$;

    if (!this.recordingId) {
      request$ = this._recordsRestService.create(this.fileId, value);
    } else {
      request$ = this._recordsRestService.update(this.recordingId, value);
    }

    request$.subscribe({
      next: (response) => {
        this.showCreateForm = false;
        if (!this.recordingId) {
          this.data.unshift(response);
          return;
        }

        const index = this.data.findIndex((d) => d._id === this.recordingId);
        this.data[index] = response;
      },
    });
  }

  private async showConfirmModal(param: any): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Eliminar acta',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Eliminar',
      width: 600,
      padding: '0.5em',
      color: '#012e54',
      html: `¿Está seguro que desea eliminar el acta <strong>${param.name}</strong>?.`,
      cancelButtonColor: '#890000',
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: 'Cancelar',
      iconColor: '#000000',
    });
  }
}
