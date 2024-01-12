import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ILoginForm, ILoginResponse, IRecoveryPasswordForm, IUpdatePassword } from '../interface/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRestService {
  private readonly url: string;
  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/auth`;
  }

  login(data: ILoginForm): Observable<ILoginResponse> {
    return this._httpClient.post<ILoginResponse>(`${this.url}/login`, { ...data });
  }

  updatePassword(data: IUpdatePassword): Observable<boolean> {
    return this._httpClient.post<boolean>(`${this.url}/update-password`, { ...data });
  }

  recoveryPassword(data: IRecoveryPasswordForm): Observable<boolean> {
    return this._httpClient.post<boolean>(`${this.url}/recovery-password`, { ...data });
  }
}
