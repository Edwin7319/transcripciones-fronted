import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { EFileType } from '../../../constants/constants';
import { Utils } from '../../../utils/utils';
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

  downloadTxtFile(audioRecording: IAudioRecording): Observable<string> {
    return this._httpClient
      .get(`${this.url}/descargar-transcripcion/${audioRecording._id}`, {
        responseType: 'arraybuffer',
      })
      .pipe(
        map((buffer: ArrayBuffer) => {
          const fileName = audioRecording.originalName.split('.')[0];
          Utils.downloadFile(buffer, EFileType.TXT, `${fileName}.txt`);
          return 'Ok';
        }),
      );
  }
}
