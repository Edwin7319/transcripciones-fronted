import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormUtil } from '../../../../utils/form.util';
import { IAudioRecording } from '../../../audio-recording/interface/audio-recording.interface';
import { AudioRecordingRestService } from '../../../audio-recording/service/audio-recording.rest.service';

@Component({
  selector: 'app-upload-file-transcription-modal',
  templateUrl: './upload-file-transcription-modal.component.html',
  styles: [],
})
export class UploadFileTranscriptionModalComponent {
  form!: FormGroup;
  isFormValid = false;
  private formValues = { txtFile: null, srtFile: null };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAudioRecording,
    public dialogRef: MatDialogRef<UploadFileTranscriptionModalComponent>,
    private readonly _audioRecordingRestService: AudioRecordingRestService,
    private readonly _formUtils: FormUtil,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      txtFile: new FormControl(null, [this._formUtils.requiredValidator('archivo txt')]),
      srtFile: new FormControl(null, [this._formUtils.requiredValidator('archivo srt')]),
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  onUploadFile(event: Event, type: 'txtFile' | 'srtFile') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const file = (event.target as HTMLInputElement).files[0];
    this.formValues = {
      ...this.formValues,
      [type]: file,
    };
    this.isFormValid = !!this.formValues.srtFile && !!this.formValues.txtFile;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  acceptModal(): void {
    const saveTranscription$ = this._audioRecordingRestService.saveFileTranscription({
      audioId: this.data._id,
      srtFile: this.formValues.srtFile as unknown as File,
      txtFile: this.formValues.txtFile as unknown as File,
    });

    saveTranscription$.subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
    });
  }
}
