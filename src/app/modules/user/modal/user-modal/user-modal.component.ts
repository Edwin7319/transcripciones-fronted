import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, Subscription } from 'rxjs';

import { FORM_DEBOUNCE_TIME } from '../../../../constants/constants';
import { IAutocomplete } from '../../../../shared/components/autocomplete/autocomplete.component';
import { FormUtil } from '../../../../utils/form.util';
import { IUserForm } from '../../interface/user.interface';
import { UserRestService } from '../../service/user.rest.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styles: [],
})
export class UserModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscriptions: Array<Subscription> = [];
  formValues: IUserForm | undefined;
  roles: Array<IAutocomplete> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserModalComponent>,
    private readonly _formUtils: FormUtil,
    private readonly _userRestService: UserRestService,
    private readonly _userService: UserRestService,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        this._formUtils.requiredValidator('nombre'),
        this._formUtils.minLengthValidator('nombre', 2),
      ]),
      lastName: new FormControl(null, [
        this._formUtils.requiredValidator('apellido'),
        this._formUtils.minLengthValidator('apellido', 2),
      ]),
      email: new FormControl('', [
        this._formUtils.requiredValidator('correo'),
        this._formUtils.minLengthValidator('correo', 5),
        this._formUtils.emailValidator,
      ]),
      roles: new FormControl(null, [this._formUtils.requiredValidator('roles')]),
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  ngOnInit(): void {
    this.getRoles();
    this.listenFormChanges();
  }

  private getRoles(): void {
    const roles$ = this._userRestService.getRoles();

    roles$.subscribe({
      next: (roles) => {
        this.roles = roles.map((rol) => ({
          data: rol,
          value: rol._id,
          label: rol.name,
        }));
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  listenFormChanges(): void {
    const form$ = this.form.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe({
      next: () => {
        if (!this.form.invalid) {
          this.formValues = this.form.getRawValue();
        } else {
          this.formValues = undefined;
        }
      },
    });
    this.subscriptions.push(form$);
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  acceptModal(): void {
    this.registerUser(this.formValues as IUserForm);
  }

  private registerUser(data: IUserForm): void {
    const register$ = this._userService.register(data);
    register$.subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
    });
  }
}
