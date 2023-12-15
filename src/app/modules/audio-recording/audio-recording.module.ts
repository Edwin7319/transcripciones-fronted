import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { DockModule } from 'primeng/dock';
import { TableModule } from 'primeng/table';

import { ByteToMBytePipe } from '../../pipes/byte-to-megabyte';
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
    ByteToMBytePipe,
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
  ],
})
export class AudioRecordingModule {}
