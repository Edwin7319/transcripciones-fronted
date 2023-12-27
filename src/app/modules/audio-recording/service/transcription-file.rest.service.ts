import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ITranscriptionFile } from '../interface/transcription-file.interface';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionFileRestService {
  private readonly url: string;

  constructor(private readonly _httpClient: HttpClient) {
    this.url = `${environment.api}/transcripcion-archivo`;
  }

  getOne(audioRecordingId: string): Observable<ITranscriptionFile> {
    return this._httpClient.get<ITranscriptionFile>(`${this.url}/obtener-transcripcion/${audioRecordingId}`);
  }
}
