import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtil {
  private static validateInputText(
    input: string | boolean | number[] | number,
    minLength?: number,
    maxLength?: number,
  ): boolean {
    if (typeof input === 'boolean') {
      return input;
    }

    if (Array.isArray(input) && input.length) {
      return true;
    }

    if (typeof input === 'number') {
      return true;
    }

    let stringValue = '';

    if (input && typeof input === 'string') {
      stringValue = input?.trim() || '';
    }

    if (!stringValue) {
      return false;
    }
    return !(
      !stringValue ||
      (minLength && stringValue.length < minLength) ||
      (maxLength && stringValue.length > maxLength)
    );
  }

  public requiredValidator(inputName: string): any {
    return (control: FormControl) => {
      if (typeof control.value === 'boolean') return null;
      if (!inputName || !FormUtil.validateInputText(control.value)) {
        return {
          required: `El campo ${inputName.toLowerCase()} es requerido.`,
        };
      }
      return null;
    };
  }

  public maxLengthValidator(inputName = '', maxLength: number): any {
    return (control: FormControl) => {
      if (!control.value && !control.hasError('required')) {
        return null;
      }
      if (inputName && !FormUtil.validateInputText(control.value, 0, maxLength)) {
        return {
          maxlength: `El campo ${inputName.toLowerCase()} no puede ser mayor a
          ${maxLength} caracteres.`,
        };
      }
      return null;
    };
  }

  public minLengthValidator(inputName = '', minLength: number): any {
    return (control: FormControl) => {
      if (!control.value && !control.hasError('required')) {
        return null;
      }
      if (control.value && !FormUtil.validateInputText(control.value, minLength)) {
        return {
          minlength: `El campo ${inputName.toLowerCase()} debe tener al menos ${minLength}
           caracteres.`,
        };
      }
      return null;
    };
  }

  public emailValidator: any = (control: FormControl) => {
    const regexEmail = /^([a-z0-9_\-.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (!control.value && !control.hasError('required')) {
      return null;
    }
    if (control.value && !regexEmail.test(control.value.trim())) {
      return {
        email: 'El correo electrónico no es válido.',
      };
    }
    return null;
  };

  public passwordValidator(inputName = ''): any {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,50}$/;
    return (control: FormControl) => {
      if (!control.value && !control.hasError('required')) {
        return null;
      }
      if (control.value && regexPassword.test(control.value)) {
        return {
          // eslint-disable-next-line max-len
          password: `${inputName.toLowerCase()} debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.`,
        };
      }
      return null;
    };
  }

  public stringValidator: any = (control: FormControl) => {
    const regexString = /^[A-Za-z]+$/;
    if (!control.value && !control.hasError('required')) {
      return null;
    }
    if (control.value && !regexString.test(control.value)) {
      return {
        email: 'Ingrese solo caracteres alfabéticos',
      };
    }
    return null;
  };

  public numberStringValidator: any = (control: FormControl) => {
    const regexString = /^[0-9]+$/;
    if (!control.value && !control.hasError('required')) {
      return null;
    }
    if (control.value && !regexString.test(control.value)) {
      return {
        path: 'Ingrese solo caracteres numéricos.',
      };
    }
    return null;
  };

  public numberMinValidator: any = (control: FormControl, min: number) => {
    if (!control.value && !control.hasError('required')) {
      return null;
    }
    if (control.value < min) {
      return {
        min: 'El valor mínimo es ' + min,
      };
    }
    return null;
  };
}
