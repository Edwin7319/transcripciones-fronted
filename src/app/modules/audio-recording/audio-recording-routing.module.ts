import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AudioRecordingPageComponent } from './page/audio-recording-page/audio-recording-page.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: AudioRecordingPageComponent,
  },
  {
    path: '',
    redirectTo: 'gestion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioRecordingRoutingModule {}
