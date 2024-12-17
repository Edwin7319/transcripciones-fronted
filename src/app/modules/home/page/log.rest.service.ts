import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogRestService {
  private readonly url: string;
  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/log`;
  }

  getAll(schemaType: string, pageIndex: number, pageSize: number, query: string): Observable<any> {
    return this._httpClient.get<any>(`${this.url}/${schemaType}?pageIndex=${pageIndex}&pageSize=${pageSize}&${query}`);
  }
}
