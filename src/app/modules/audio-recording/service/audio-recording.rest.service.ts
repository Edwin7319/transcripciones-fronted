import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  IAudioRecording,
  IAudioRecordingForm,
  IAudioRecordingPagination,
} from '../interface/audio-recording.interface';

@Injectable({
  providedIn: 'root',
})
export class AudioRecordingRestService {
  private readonly url: string;

  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/registro-de-audio`;
  }

  getAll(): Observable<IAudioRecordingPagination> {
    return this._httpClient.get<IAudioRecordingPagination>(this.url);
  }

  create(data: IAudioRecordingForm): Observable<IAudioRecording> {
    const formData = new FormData();
    formData.append('audio', data.file);
    formData.append('name', data.name);
    formData.append('duration', `${data.duration}`);

    return this._httpClient.post<IAudioRecording>(this.url, formData);
  }

  update(id: string, data: Partial<IAudioRecordingForm>): Observable<IAudioRecording> {
    return this._httpClient.put<IAudioRecording>(`${this.url}/${id}`, { ...data });
  }

  delete(id: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this.url}/${id}`);
  }

  getAudio(id: string): Observable<any> {
    return this._httpClient.get(`${this.url}/obtener-audio/${id}`, { responseType: 'blob' });
  }
}
