import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Track, AudioPlayerComponent } from '@khajegan/ngx-audio-player';
import { Subscription } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { IAudioRecording } from '../../interface/audio-recording.interface';

type TRowAction = 'select' | 'unselect';

@Component({
  selector: 'app-audio-recording-page',
  templateUrl: './audio-recording-page.component.html',
  styles: [],
})
export class AudioRecordingPageComponent implements OnInit, OnDestroy {
  @ViewChild('player', { static: false })
  advancedPlayer!: AudioPlayerComponent;

  private apiUrl = '';
  private subscriptions: Array<Subscription> = [];
  audioList: Track[] = [];
  startAudioAt = 0;
  currentTime = 0;

  ngOnInit(): void {
    this.apiUrl = `${environment.api}/registro-de-audio`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  selectAudioRow(data: IAudioRecording, action: TRowAction): void {
    this.audioList = [];
    if (action === 'unselect') {
      return;
    }

    this.audioList.push({
      title: data.originalName,
      link: `${this.apiUrl}/${data.copyName}`,
      artist: 'Manticore',
      duration: data.duration,
    });
  }

  onEvent(event: any) {}

  logCurrentTime() {
    const currentTime$ = this.advancedPlayer.audioPlayerService.getCurrentTime().subscribe({
      next: (time) => {
        console.log(time);
      },
    });
    this.subscriptions.push(currentTime$);
  }
}
