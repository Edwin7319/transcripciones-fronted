import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './page/user-page.component';

const routes: Routes = [
  {
    path: 'gestion-usuarios',
    component: UserPageComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-usuarios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
