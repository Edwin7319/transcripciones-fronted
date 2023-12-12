import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styles: [
    `
      input[type='checkbox'] {
        box-sizing: border-box;
        padding: 0;
        width: 30px;
        height: 30px;
      }
    `,
  ],
})
export class CheckboxComponent implements OnChanges {
  @Input()
  id = '';
  @Input()
  label = '';
  @Input()
  formGroup!: FormGroup;
  @Input()
  errorMessage = '';
  @Input()
  required = false;
  @Input()
  labelExtraClasses = '';

  control!: FormControl;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      this.control = this.formGroup.get(this.id) as FormControl;
    }
  }

  objectError = Object;
}
