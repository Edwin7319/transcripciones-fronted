import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { HandlingAudioRecordingRoutingModule } from './handling-audio-recording-routing.module';
import { HandlingAudioPageComponent } from './page/handling-audio-page.component';

@NgModule({
  declarations: [HandlingAudioPageComponent],
  imports: [
    CommonModule,
    HandlingAudioRecordingRoutingModule,
    PipesModule,
    SharedModule,
    SharedModule,
    TableModule,
    TooltipModule,
  ],
})
export class HandlingAudioRecordingModule {}
