import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuditPageComponent } from './page/audit-page.component';

const routes: Routes = [
  {
    path: 'auditoria/:tipo',
    component: AuditPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
