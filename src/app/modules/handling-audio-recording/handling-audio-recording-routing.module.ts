import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ERole } from '../../constants/constants';
import { AuthGuard } from '../../guard/auth.guard';

import { HandlingAudioPageComponent } from './page/handling-audio-page.component';

const routes: Routes = [
  {
    path: 'manejo-estados-audio',
    component: HandlingAudioPageComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [ERole.ADMIN_SISTEMA],
    },
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
