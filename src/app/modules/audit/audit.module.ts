import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditPageComponent } from './page/audit-page.component';

@NgModule({
  declarations: [AuditPageComponent],
  imports: [
    CommonModule,
    AuditRoutingModule,
    SharedModule,
    PipesModule,
    SharedModule,
    TableModule,
    TooltipModule,
    SharedModule,
  ],
})
export class AuditModule {}
