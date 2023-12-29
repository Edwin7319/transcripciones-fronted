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
  currentTime = 0;

  ngOnInit(): void {
    this.apiUrl = `${environment.api}/registro-de-audio`;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  selectAudioRow(data: IAudioRecording, action: TRowAction): void {
    this.audioList = [];

    if (action === 'unselect') return;

    this.audioList = [
      {
        title: data.originalName,
        link: `${this.apiUrl}/${data.copyName}`,
        artist: data.name,
        duration: data.duration,
      },
    ];

    setTimeout(() => {
      this.trackingCurrentTime();
    }, 1000);
  }

  onTrackEnded(_event: any) {
    this.unsubscribe();
  }

  private trackingCurrentTime() {
    if (!this.advancedPlayer.isPlaying) return;
    const currentTime$ = this.advancedPlayer.audioPlayerService.getCurrentTime().subscribe({
      next: (time) => {
        this.currentTime = time;
      },
    });
    this.subscriptions.push(currentTime$);
  }
}
