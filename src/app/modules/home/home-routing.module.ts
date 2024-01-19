import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'transcripcion/registro-de-audio',
    loadChildren: () => import('../audio-recording/audio-recording.module').then((m) => m.AudioRecordingModule),
    data: {
      breadcrumb: {
        label: 'Registro de audio',
      },
    },
  },
  {
    path: 'transcripcion',
    loadChildren: () => import('../audit/audit.module').then((m) => m.AuditModule),
    data: {
      breadcrumb: {
        label: 'Historial',
      },
    },
  },
  {
    path: 'transcripcion',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
    data: {
      breadcrumb: {
        label: 'Usuarios',
      },
    },
  },
  {
    path: 'transcripcion',
    loadChildren: () =>
      import('../handling-audio-recording/handling-audio-recording.module').then((m) => m.HandlingAudioRecordingModule),
    data: {
      breadcrumb: {
        label: 'Registros de audio',
      },
    },
  },
  {
    path: '',
    redirectTo: 'transcripcion/registro-de-audio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
