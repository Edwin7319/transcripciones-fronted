import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IAudioRecording } from '../interface/audio-recording.interface';
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

  downloadFile(audioRecording: IAudioRecording): Observable<string> {
    return this._httpClient
      .get(`${this.url}/descargar-transcripcion/${audioRecording._id}`, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((buffer: ArrayBuffer) => {
          const blob = new Blob([buffer], { type: 'application/octet-stream' });
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);

          const fileName = audioRecording.originalName.split('.')[0];

          a.href = objectUrl;
          a.download = `${fileName}.txt`;
          a.click();

          URL.revokeObjectURL(objectUrl);

          return 'Ok';
        }),
      );
  }
}
