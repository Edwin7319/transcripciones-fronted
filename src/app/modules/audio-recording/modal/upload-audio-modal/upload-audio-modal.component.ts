import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, Subscription } from 'rxjs';

import { FORM_DEBOUNCE_TIME } from '../../../../constants/constants';
import { FormUtil } from '../../../../utils/form.util';
import { IAudioRecordingForm } from '../../interface/audio-recording.interface';

@Component({
  selector: 'app-upload-audio-modal',
  templateUrl: './upload-audio-modal.component.html',
  styles: [],
})
export class UploadAudioModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscriptions: Array<Subscription> = [];
  selectedFile: File | undefined;
  formValues: IAudioRecordingForm | undefined;
  duration = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadAudioModalComponent>,
    private readonly _formUtils: FormUtil,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [this._formUtils.requiredValidator('nombre')]),
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  ngOnInit(): void {
    this.loadFormData();
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  loadFormData(): void {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
      });
    }
  }

  listenFormChanges(): void {
    const form$ = this.form.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe({
      next: () => {
        if (!this.form.invalid) {
          this.formValues = this.form.getRawValue();
        } else {
          this.formValues = undefined;
        }
      },
    });
    this.subscriptions.push(form$);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  acceptModal(): void {
    this.dialogRef.close({
      ...this.formValues,
      file: this.selectedFile,
      duration: this.duration,
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = undefined;
    const selectedFile = event.target?.files[0];

    if (selectedFile) {
      const audioElement = document.createElement('audio');

      audioElement.src = URL.createObjectURL(selectedFile);
      audioElement.addEventListener('loadedmetadata', () => {
        this.duration = audioElement.duration;
        this.selectedFile = selectedFile;
      });
    }
  }
}
