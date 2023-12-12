import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AUDIO_RECORDING_TABLE_COLUMNS, ROWS, ROWS_PAGINATION } from '../../../../constants/constants';
import { ITableColumn } from '../../../../interfaces/interfaces';
import { UploadAudioModalComponent } from '../../modal/upload-audio-modal/upload-audio-modal.component';

@Component({
  selector: 'app-audio-recording-page',
  templateUrl: './audio-recording-page.component.html',
  styles: [],
})
export class AudioRecordingPageComponent {
  data: Array<any> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...AUDIO_RECORDING_TABLE_COLUMNS];

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
  ) {}

  openCreateOrEditModal(rowData?: any): void {
    const dialogRef = this._dialog.open(UploadAudioModalComponent, {
      data: rowData,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (!result) return;
      },
    });
  }
}
