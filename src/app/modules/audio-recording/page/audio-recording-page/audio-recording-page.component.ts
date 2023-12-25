import { Component, OnInit } from '@angular/core';
import { Track } from '@khajegan/ngx-audio-player';

import { environment } from '../../../../../environments/environment';
import { IAudioRecording } from '../../interface/audio-recording.interface';

type TRowAction = 'select' | 'unselect';

@Component({
  selector: 'app-audio-recording-page',
  templateUrl: './audio-recording-page.component.html',
  styles: [],
})
export class AudioRecordingPageComponent implements OnInit {
  private apiUrl = '';
  audioList: Track[] = [];

  ngOnInit(): void {
    this.apiUrl = `${environment.api}/registro-de-audio`;
  }

  selectAudioRow(data: IAudioRecording, action: TRowAction): void {
    if (action === 'unselect') {
      this.audioList = [];
      return;
    }

    this.audioList.push({
      title: data.originalName,
      link: `${this.apiUrl}/${data.copyName}`,
      artist: 'Manticore',
      duration: data.duration,
    });
  }
}
