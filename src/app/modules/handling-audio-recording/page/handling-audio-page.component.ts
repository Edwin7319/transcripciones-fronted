import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { HANDLING_AUDIO_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../constants/constants';
import { ITableColumn } from '../../../interfaces/interfaces';
import { IAudioRecording } from '../../audio-recording/interface/audio-recording.interface';
import {
  AudioRecordingRestService,
  EAudioRecordingStatus,
} from '../../audio-recording/service/audio-recording.rest.service';

@Component({
  selector: 'app-handling-audio-page',
  templateUrl: './handling-audio-page.component.html',
  styles: [],
})
export class HandlingAudioPageComponent implements OnInit {
  data: Array<IAudioRecording> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...HANDLING_AUDIO_TABLE_COLUMNS];

  constructor(
    private readonly _audioRecordingRestService: AudioRecordingRestService,
    private readonly _toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getInitData();
  }

  private getInitData(): void {
    const getAll$ = this._audioRecordingRestService.getAllByAdmin();

    getAll$.subscribe({
      next: (response) => {
        this.data = response.data;
        const [pagination] = response.metadata;
        this.totalRecords = pagination.total;
      },
    });
  }

  async saveAudioTranscription(rowData: IAudioRecording): Promise<void> {
    if (rowData.processStatus === EAudioRecordingStatus.PROCESSED) {
      return;
    }

    const modalResponse = await this.showConfirmModal(rowData);

    if (modalResponse.isDismissed) return;

    const delete$ = this._audioRecordingRestService.saveFileTranscription({
      audioId: rowData._id,
      fileName: rowData.originalName.split('.')[0],
    });

    delete$.subscribe({
      next: (response) => {
        this._toaster.success('Registro eliminado de manera correcta', 'Éxito');
        const index = this.data.findIndex((d) => d._id === rowData._id);
        this.data[index] = response;
      },
    });
  }

  private async showConfirmModal(param: IAudioRecording): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Guardar transcripciones',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Guardar',
      width: 600,
      padding: '0.5em',
      html: `
      <div style="text-align: left; font-size: 15px;">
        <span>¿Está seguro en guardar las transcripciones para el audio <strong>${param.originalName}</strong>?.</span>
        <br>
        <span>Ten en cuenta que los archivos de texto deben encontrarse en la ruta determinada</span>
     </div>
    `,
      confirmButtonColor: '#012e54',
      cancelButtonColor: '#890000',
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: 'Cancelar',
      iconColor: '#000000',
    });
  }
}
