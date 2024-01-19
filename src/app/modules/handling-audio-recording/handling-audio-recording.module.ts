import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { HandlingAudioRecordingRoutingModule } from './handling-audio-recording-routing.module';
// eslint-disable-next-line max-len
import { UploadFileTranscriptionModalComponent } from './modal/upload-file-transcription-modal/upload-file-transcription-modal.component';
import { HandlingAudioPageComponent } from './page/handling-audio-page.component';

@NgModule({
  declarations: [HandlingAudioPageComponent, UploadFileTranscriptionModalComponent],
  imports: [
    CommonModule,
    HandlingAudioRecordingRoutingModule,
    PipesModule,
    SharedModule,
    SharedModule,
    TableModule,
    TooltipModule,
    MatDialogModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
})
export class HandlingAudioRecordingModule {}
