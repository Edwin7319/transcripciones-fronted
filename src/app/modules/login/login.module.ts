import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { LoginFormComponent } from './forms/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './page/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, NgOptimizedImage, ReactiveFormsModule],
})
export class LoginModule {}
