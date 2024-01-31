import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  IRole,
  IUser,
  IUserForm,
  IUserPaginationPopulated,
  IUserPopulated,
  TUserStatus,
} from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRestService {
  private readonly url: string;
  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/usuario`;
  }

  register(data: IUserForm): Observable<IUser> {
    return this._httpClient.post<IUser>(`${this.url}/registrar`, { ...data });
  }

  update(id: string, data: IUserForm): Observable<IUser> {
    return this._httpClient.put<IUser>(`${this.url}/editar/${id}`, { ...data });
  }

  getAll(): Observable<IUserPaginationPopulated> {
    return this._httpClient.get<IUserPaginationPopulated>(`${this.url}`);
  }

  getRoles(): Observable<Array<IRole>> {
    return this._httpClient.get<Array<IRole>>(`${this.url}/roles`);
  }

  updateStatus(userId: string, status: TUserStatus): Observable<IUserPopulated> {
    return this._httpClient.put<IUserPopulated>(`${this.url}/actualizar-estado/${userId}`, { status });
  }
}
