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

export enum EAudioRecordingStatus {
  CREATED = 'CREADO',
  PENDING = 'PENDIENTE DE PROCESAMIENTO',
  PROCESSED = 'PROCESADO',
  ERROR = 'ERROR',
}

@Injectable({
  providedIn: 'root',
})
export class AudioRecordingRestService {
  private readonly url: string;

  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/registro-de-audio`;
  }

  getAllByUser(): Observable<IAudioRecordingPagination> {
    return this._httpClient.get<IAudioRecordingPagination>(`${this.url}/por-usuario`);
  }

  getAllByAdmin(): Observable<IAudioRecordingPagination> {
    return this._httpClient.get<IAudioRecordingPagination>(`${this.url}/todos`);
  }

  create(data: IAudioRecordingForm): Observable<IAudioRecording> {
    const formData = new FormData();
    formData.append('audio', data.file);
    formData.append('name', data.name);
    formData.append('duration', `${data.duration}`);

    return this._httpClient.post<IAudioRecording>(`${this.url}/cargar-audio`, formData);
  }

  update(id: string, data: Partial<IAudioRecordingForm>): Observable<IAudioRecording> {
    return this._httpClient.put<IAudioRecording>(`${this.url}/${id}`, { ...data });
  }

  delete(id: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this.url}/${id}`);
  }

  saveFileTranscription(data: { audioId: string; txtFile: File; srtFile: File }): Observable<IAudioRecording> {
    const formData = new FormData();
    formData.append('audioId', data.audioId);
    formData.append('transcription', data.srtFile);
    formData.append('transcription', data.txtFile);
    return this._httpClient.patch<IAudioRecording>(`${this.url}/guardar-transcripcion`, formData);
  }
}
