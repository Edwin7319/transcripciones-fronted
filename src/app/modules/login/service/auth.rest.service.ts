import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ILoginForm, ILoginResponse } from '../interface/login.interface';

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
}
