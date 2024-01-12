import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../shared/shared.module';

import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RecoveryPasswordFormComponent } from './forms/recovery-password-form/recovery-password-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { UpdatePasswordModalComponent } from './modal/update-password-modal/update-password-modal.component';
import { LoginPageComponent } from './page/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, RecoveryPasswordFormComponent, UpdatePasswordModalComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, NgOptimizedImage, ReactiveFormsModule, MatDialogModule],
})
export class LoginModule {}
