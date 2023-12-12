import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NzMenuModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [
    ButtonComponent,
    FooterComponent,
    HeaderComponent,
    InputComponent,
    SidebarComponent,
    PageTitleComponent,
    CheckboxComponent,
    AutocompleteComponent,
  ],
  exports: [
    ButtonComponent,
    FooterComponent,
    HeaderComponent,
    InputComponent,
    SidebarComponent,
    PageTitleComponent,
    CheckboxComponent,
    AutocompleteComponent,
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
