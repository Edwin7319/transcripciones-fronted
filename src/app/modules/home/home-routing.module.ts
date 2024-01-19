import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ERole } from '../../constants/constants';
import { AuthGuard } from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: 'transcripcion/registro-de-audio',
    loadChildren: () => import('../audio-recording/audio-recording.module').then((m) => m.AudioRecordingModule),
    canActivate: [AuthGuard],
    data: {
      roles: [ERole.ADMIN, ERole.USER],
      breadcrumb: {
        label: 'Registro de audio',
      },
    },
  },
  {
    path: 'transcripcion',
    loadChildren: () => import('../audit/audit.module').then((m) => m.AuditModule),
    canActivate: [AuthGuard],
    data: {
      roles: [ERole.ADMIN],
      breadcrumb: {
        label: 'Historial',
      },
    },
  },
  {
    path: 'transcripcion',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
    data: {
      roles: [ERole.ADMIN],
      breadcrumb: {
        label: 'Usuarios',
      },
    },
  },
  {
    path: 'transcripcion',
    loadChildren: () =>
      import('../handling-audio-recording/handling-audio-recording.module').then((m) => m.HandlingAudioRecordingModule),
    canActivate: [AuthGuard],
    data: {
      roles: [ERole.ADMIN],
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
