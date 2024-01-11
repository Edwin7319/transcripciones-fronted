export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRecoveryPasswordForm {
  email: string;
}

export interface ILoginResponse {
  passwordStatus: string;
  token: string;
}
