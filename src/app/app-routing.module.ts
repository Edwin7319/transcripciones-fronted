import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
    data: {
      breadcrumb: {
        label: 'Inicio',
        info: 'home',
      },
    },
  },
  {
    path: 'public',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
