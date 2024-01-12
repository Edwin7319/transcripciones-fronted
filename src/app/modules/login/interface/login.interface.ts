import { EPasswordStatus } from '../../../constants/constants';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRecoveryPasswordForm {
  email: string;
}

export interface ILoginResponse {
  passwordStatus: EPasswordStatus;
  token: string;
}

export interface IUpdatePasswordForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUpdatePassword {
  email: string;
  password: string;
  newPassword: string;
}
