import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { UserModalComponent } from './modal/user-modal/user-modal.component';
import { UserPageComponent } from './page/user-page.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserPageComponent, UserModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    PipesModule,
    TableModule,
    TooltipModule,
    MatDialogModule,
    PaginatorModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
