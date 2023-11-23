import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BreadcrumbModule, ToastrModule.forRoot(), SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
