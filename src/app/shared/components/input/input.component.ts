import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IConfig } from 'ngx-mask/lib/ngx-mask.config';

type InputType = 'text' | 'number' | 'password' | 'email' | 'date' | 'time' | 'datetime-local' | 'file';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: [],
})
export class InputComponent implements OnChanges {
  @Input()
  type: InputType = 'text';
  @Input()
  id = '';
  @Input()
  label = '';
  @Input()
  placeholder = '';
  @Input()
  formGroup!: FormGroup;
  @Input()
  appAutoFocus = false;
  @Input()
  errorMessage = '';
  @Input()
  required = false;
  @Input()
  readonly = false;
  @Input()
  isTextarea = false;
  @Input()
  textareaRows = 3;
  @Input()
  help?: string;
  @Input()
  showMask = false;
  @Input()
  maskType = 'percent';
  @Input()
  maskSuffix = '';
  @Input()
  maskPrefix = '';
  @Input()
  maskThousandSeparator = '';
  @Input()
  maskDecimalMarker: IConfig['decimalMarker'] = '' as any;

  @Output()
  blurEvent: EventEmitter<boolean> = new EventEmitter();

  objectError = Object;
  control!: FormControl;

  showPassword = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formGroup']) {
      this.control = this.formGroup.get(this.id) as FormControl;
    }
  }

  blur(): void {
    this.blurEvent.emit(true);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
