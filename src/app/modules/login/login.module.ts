import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { LoginFormComponent } from './forms/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RecoveryPasswordFormComponent } from './forms/recovery-password-form/recovery-password-form.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, RecoveryPasswordFormComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, NgOptimizedImage, ReactiveFormsModule],
})
export class LoginModule {}
