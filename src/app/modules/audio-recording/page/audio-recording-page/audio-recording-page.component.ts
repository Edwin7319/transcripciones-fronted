import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AudioPlayerComponent, Track } from '@khajegan/ngx-audio-player';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { environment } from '../../../../../environments/environment';
import { IAudioRecording } from '../../interface/audio-recording.interface';
import { EAudioRecordingStatus } from '../../service/audio-recording.rest.service';

type TRowAction = 'select' | 'unselect';

@Component({
  selector: 'app-audio-recording-page',
  templateUrl: './audio-recording-page.component.html',
  providers: [CookieService],
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
    this.apiUrl = `${environment.api}/registro-de-audio/reproducir`;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  private async showModal(param: any): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Reproducir audio',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
      width: 600,
      padding: '0.5em',
      confirmButtonColor: '#012e54',
      html: `
      <div style="text-align: left; font-size: 15px;">
        El audio <strong>${param.name}</strong> no se encuentra disponible en este momento.
        <br>
        Por favor solicita al administrador el procesamiento del mismo y luego contiúa\`,
      </div>
      `,
      showCloseButton: true,
      iconColor: '#000000',
    });
  }

  selectAudioRow(data: IAudioRecording, action: TRowAction): void {
    this.audioList = [];

    if (action === 'unselect') return;

    if (data.processStatus !== EAudioRecordingStatus.PROCESSED) {
      void this.showModal(data);
      return;
    }

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
