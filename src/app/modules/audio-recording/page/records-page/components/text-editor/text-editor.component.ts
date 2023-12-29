import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

import { FORM_DEBOUNCE_TIME } from '../../../../../../constants/constants';
import { FormUtil } from '../../../../../../utils/form.util';
import { IRecordsForm } from '../../../../interface/records';
import { RecordsRestService } from '../../../../service/records.rest.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styles: [],
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @Input()
  inputFormData!: IRecordsForm;
  @Output()
  formValuesEvent: EventEmitter<IRecordsForm> = new EventEmitter<IRecordsForm>();

  form!: FormGroup;
  formValues: IRecordsForm | undefined;
  isFormValid = false;

  private subscriptions: Array<Subscription> = [];
  constructor(
    private readonly _formUtils: FormUtil,
    private readonly _recordsRestService: RecordsRestService,
  ) {
    this.buildForm();
  }
  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [this._formUtils.requiredValidator('nombre')]),
      text: new FormControl(null, [this._formUtils.requiredValidator('texto')]),
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  ngOnInit(): void {
    this.loadFormData();
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  loadFormData(): void {
    if (this.inputFormData) {
      this.form.patchValue({
        ...this.inputFormData,
      });
    }
  }

  listenFormChanges(): void {
    const form$ = this.form.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe({
      next: () => {
        this.formValues = this.form.getRawValue();
        this.isFormValid = !!this.formValues?.text;
      },
    });
    this.subscriptions.push(form$);
  }

  createOrUpdate() {
    this.formValuesEvent.emit(this.formValues);
  }
}
