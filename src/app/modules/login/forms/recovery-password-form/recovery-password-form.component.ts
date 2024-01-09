import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

import { FORM_DEBOUNCE_TIME } from '../../../../constants/constants';
import { FormUtil } from '../../../../utils/form.util';
import { IRecoveryPasswordForm } from '../../interface/login.interface';

@Component({
  selector: 'app-recovery-password-form',
  templateUrl: './recovery-password-form.component.html',
  styles: [],
})
export class RecoveryPasswordFormComponent implements OnInit, OnDestroy {
  @Output()
  recoveryPassEvent: EventEmitter<IRecoveryPasswordForm> = new EventEmitter<IRecoveryPasswordForm>();

  form!: FormGroup;
  subscriptions: Array<Subscription> = [];

  constructor(private readonly _formUtils: FormUtil) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        this._formUtils.requiredValidator('correo'),
        this._formUtils.minLengthValidator('correo', 5),
        this._formUtils.emailValidator,
      ]),
    });
  }
  ngOnInit(): void {
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  listenFormChanges(): void {
    const form$ = this.form.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe({
      next: () => {
        if (!this.form.invalid) {
          this.recoveryPassEvent.emit({
            ...this.form.getRawValue(),
          });
        } else {
          this.recoveryPassEvent.emit(undefined);
        }
      },
    });
    this.subscriptions.push(form$);
  }
}
