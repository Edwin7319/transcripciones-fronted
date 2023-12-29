import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxAudioPlayerModule } from '@khajegan/ngx-audio-player';
import { ButtonModule } from 'primeng/button';
import { DockModule } from 'primeng/dock';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { AudioRecordingRoutingModule } from './audio-recording-routing.module';
import { UploadAudioModalComponent } from './modal/upload-audio-modal/upload-audio-modal.component';
import { AudioRecordingPageComponent } from './page/audio-recording-page/audio-recording-page.component';
import { FileListPageComponent } from './page/file-list-page/file-list-page.component';
import { TranscriptionPageComponent } from './page/transcription-page/transcription-page.component';

@NgModule({
  declarations: [
    AudioRecordingPageComponent,
    UploadAudioModalComponent,
    FileListPageComponent,
    TranscriptionPageComponent,
  ],
  imports: [
    CommonModule,
    AudioRecordingRoutingModule,
    SharedModule,
    TableModule,
    DockModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgxAudioPlayerModule,
    PipesModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class AudioRecordingModule {}
