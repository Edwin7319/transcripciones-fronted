import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { EFileType } from '../../../constants/constants';
import { Utils } from '../../../utils/utils';
import { IRecords, IRecordsForm, IRecordsPagination } from '../interface/records';

@Injectable({
  providedIn: 'root',
})
export class RecordsRestService {
  private readonly url: string;
  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/acta`;
  }

  getAll(fileId: string): Observable<IRecordsPagination> {
    return this._httpClient.get<IRecordsPagination>(`${this.url}/${fileId}`);
  }

  create(fileId: string, data: IRecordsForm): Observable<IRecords> {
    return this._httpClient.post<IRecords>(this.url, { ...data, fileId });
  }

  update(id: string, data: Partial<IRecords>): Observable<IRecords> {
    return this._httpClient.put<IRecords>(`${this.url}/${id}`, { ...data });
  }

  delete(id: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this.url}/${id}`);
  }

  downloadDocxFile(record: IRecords): Observable<string> {
    return this._httpClient
      .get(`${this.url}/descargar-word/${record._id}`, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((buffer: ArrayBuffer) => {
          const fileName = record.name.replaceAll(' ', '_');
          Utils.downloadFile(buffer, EFileType.DOCX, `${fileName}.docx`);
          return 'Ok';
        }),
      );
  }
}
