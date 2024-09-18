import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ISettingPaginationPopulated } from '../../interfaces/setting.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingRestService {
  private readonly url: string;
  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/configuracion`;
  }


  getByCode(code: string): Observable<ISettingPaginationPopulated> {
    return this._httpClient.get<ISettingPaginationPopulated>(`${this.url}/obtener-por-codigo/${code}`);
  }
}
