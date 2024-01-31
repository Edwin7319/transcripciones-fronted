import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { AUDIO_RECORDING_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../../constants/constants';
import { ITableColumn } from '../../../../interfaces/interfaces';
import { AppStoreService } from '../../../../services/app-store.service';
import { IAudioRecording, IAudioRecordingForm } from '../../interface/audio-recording.interface';
import { UploadAudioModalComponent } from '../../modal/upload-audio-modal/upload-audio-modal.component';
import { AudioRecordingRestService, EAudioRecordingStatus } from '../../service/audio-recording.rest.service';
import { TranscriptionFileRestService } from '../../service/transcription-file.rest.service';
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
    private readonly _audioRecordingRestService: AudioRecordingRestService,
    private readonly _toaster: ToastrService,
    private readonly _appStore: AppStoreService,
    private readonly _transcriptionFileService: TranscriptionFileRestService,
  ) {}

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(): void {
    this._audioRecordingRestService.getAllByUser().subscribe({
      next: (response) => {
        this.data = response.data;
        const [pagination] = response.metadata;
        this.totalRecords = pagination.total;
      },
    });
  }

  openCreateOrEditModal(event: MouseEvent, rowData?: IAudioRecording): void {
    if (rowData) {
      event.stopPropagation();
    }
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

  async delete(event: MouseEvent, rowData: IAudioRecording) {
    event.stopPropagation();
    const response = await this.showConfirmModal(rowData);

    if (response.isDismissed) return;

    const delete$ = this._audioRecordingRestService.delete(rowData._id);

    delete$.subscribe({
      next: () => {
        this.data = this.data.filter((d) => d._id !== rowData._id);
        this._toaster.success('Registro eliminado de manera correcta', 'Éxito');
        this.unselectRow.emit(rowData);
      },
    });
  }

  downloadFile(event: MouseEvent, rowData: IAudioRecording) {
    event.stopPropagation();

    if (rowData.processStatus !== EAudioRecordingStatus.PROCESSED) {
      void this.showWarningModal(rowData);
      return;
    }

    const download$ = this._transcriptionFileService.downloadTxtFile(rowData);

    download$.subscribe({
      next: () => {
        this._toaster.success('Archivo descargado de manera correcta', 'Éxito');
      },
    });
  }

  rowSelected(row: TableRowSelectEvent): void {
    if (row.data) {
      this._appStore.updateStore('audioRecordingId', row.data._id);
      this.selectRow.emit(row.data);
    }
  }

  rowUnselected(row: TableRowUnSelectEvent) {
    if (row.data) {
      this._appStore.updateStore('audioRecordingId', '');
      this.unselectRow.emit(row.data);
    }
  }

  private async showConfirmModal(param: IAudioRecording): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Eliminar audio',
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

  private async showWarningModal(param: IAudioRecording): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Descargar transcripción',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
      width: 600,
      padding: '0.5em',
      confirmButtonColor: '#012e54',
      html: `
      <div style="text-align: left; font-size: 15px;">
        La transcripción del audio <strong>${param.name}</strong> no se encuentra disponible en este momento.
        <br>
        Por favor solicita al administrador el procesamiento del mismo y luego contiúa,
      </div>
      `,
      showCloseButton: true,
      iconColor: '#000000',
    });
  }
}
