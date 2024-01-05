import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './page/home-page.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomePageComponent,
  },
  {
    path: 'registro-de-audio',
    loadChildren: () => import('../audio-recording/audio-recording.module').then((m) => m.AudioRecordingModule),
    data: {
      breadcrumb: {
        label: 'Registro de audio',
      },
    },
  },
  {
    path: 'private',
    loadChildren: () => import('../audit/audit.module').then((m) => m.AuditModule),
    data: {
      breadcrumb: {
        label: 'Auditoria',
      },
    },
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
