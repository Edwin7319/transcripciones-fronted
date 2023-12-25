import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { AUDIO_RECORDING_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../../constants/constants';
import { ITableColumn } from '../../../../interfaces/interfaces';
import { Utils } from '../../../../utils/utils';
import { IAudioRecording, IAudioRecordingForm } from '../../interface/audio-recording.interface';
import { UploadAudioModalComponent } from '../../modal/upload-audio-modal/upload-audio-modal.component';
import { AudioRecordingRestService } from '../../service/audio-recording.rest.service';

@Component({
  selector: 'app-file-list-page',
  templateUrl: './file-list-page.component.html',
  styles: [],
})
export class FileListPageComponent implements OnInit {
  @Output()
  selectRow: EventEmitter<IAudioRecording> = new EventEmitter<IAudioRecording>();
  @Output()
  unselectRow: EventEmitter<IAudioRecording> = new EventEmitter<IAudioRecording>();

  data: Array<IAudioRecording> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...AUDIO_RECORDING_TABLE_COLUMNS];

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _audioRecordingRestService: AudioRecordingRestService,
    private readonly _toaster: ToastrService,
  ) {}

  private getData(): void {
    this._audioRecordingRestService.getAll().subscribe({
      next: (response) => {
        this.data = response.data;
        const [pagination] = response.metadata;
        this.totalRecords = pagination.total;
      },
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  openCreateOrEditModal(rowData?: IAudioRecording): void {
    const dialogRef = this._dialog.open(UploadAudioModalComponent, {
      data: rowData,
    });

    dialogRef.afterClosed().subscribe({
      next: (result: IAudioRecordingForm) => {
        if (!result) return;

        if (rowData) {
          this.update(rowData._id, result);
        } else {
          this.create(result);
        }
      },
    });
  }

  create(data: IAudioRecordingForm): void {
    const create$ = this._audioRecordingRestService.create(data);

    create$.subscribe({
      next: (response) => {
        this.data.unshift(response);
      },
    });
  }

  update(id: string, data: Partial<IAudioRecordingForm>): void {
    const create$ = this._audioRecordingRestService.update(id, data);

    create$.subscribe({
      next: (response) => {
        const index = this.data.findIndex((d) => d._id === id);
        this.data[index] = response;
      },
    });
  }

  async delete(rowData: IAudioRecording) {
    const response = await this.showConfirmModal(rowData);

    if (response.isDismissed) return;

    const delete$ = this._audioRecordingRestService.delete(rowData._id);

    delete$.subscribe({
      next: (response) => {
        this.data = this.data.filter((d) => d._id !== rowData._id);
        this._toaster.success('Registro eliminado de manera correcta', 'Éxito');
      },
    });
  }

  getAudio(rowData: IAudioRecording) {
    const delete$ = this._audioRecordingRestService.getAudio(rowData._id);

    delete$.subscribe({
      next: (response) => {
        Utils.downloadFile(response, 'application/octet-stream', rowData.originalName);
        console.log(response);
      },
    });
  }

  rowSelected(row: TableRowSelectEvent): void {
    if (row.data) {
      this.selectRow.emit(row.data);
    }
  }

  rowUnselected(row: TableRowUnSelectEvent) {
    if (row.data) {
      this.unselectRow.emit(row.data);
    }
  }

  private async showConfirmModal(param: any): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Eliminar registro',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Eliminar',
      width: 600,
      padding: '0.5em',
      color: '#012e54',
      html: `¿Está seguro que desea eliminar el audio <strong>${param.name}</strong>?.`,
      cancelButtonColor: '#890000',
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: 'Cancelar',
      iconColor: '#000000',
    });
  }
}
