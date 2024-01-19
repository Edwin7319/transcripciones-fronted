import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HandlingAudioPageComponent } from './page/handling-audio-page.component';

const routes: Routes = [
  {
    path: 'manejo-estados-audio',
    component: HandlingAudioPageComponent,
  },
  {
    path: '',
    redirectTo: 'estados-audio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandlingAudioRecordingRoutingModule {}
