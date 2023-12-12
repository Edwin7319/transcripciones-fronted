import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, NzMenuModule],
  declarations: [ButtonComponent, FooterComponent, HeaderComponent, InputComponent, SidebarComponent],
  exports: [ButtonComponent, FooterComponent, HeaderComponent, InputComponent, SidebarComponent],
  providers: [provideNgxMask()],
})
export class SharedModule {}
