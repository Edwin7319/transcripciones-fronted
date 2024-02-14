import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HANDLING_AUDIO_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../constants/constants';
import { ITableColumn } from '../../../interfaces/interfaces';
import { IAudioRecording } from '../../audio-recording/interface/audio-recording.interface';
import {
  AudioRecordingRestService,
  EAudioRecordingStatus,
} from '../../audio-recording/service/audio-recording.rest.service';
// eslint-disable-next-line max-len
import { UploadFileTranscriptionModalComponent } from '../modal/upload-file-transcription-modal/upload-file-transcription-modal.component';

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
    private readonly _dialog: MatDialog,
    private readonly _audioRecordingRestService: AudioRecordingRestService,
    private readonly _toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(): void {
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
      this._toaster.warning('Se va a actualizar la transcripción', 'Atención');
    }

    const dialogRef = this._dialog.open(UploadFileTranscriptionModalComponent, {
      data: rowData,
      width: '30em',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: IAudioRecording) => {
        if (!result) return;
        this._toaster.success('Transcripción cargada de manera correcta', 'Éxito');
        const index = this.data.findIndex((d) => d._id === rowData._id);
        this.data[index] = result;
      },
    });
  }
}
