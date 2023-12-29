import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppStoreService } from '../../../../services/app-store.service';
import { ITranscriptionLocation } from '../../interface/transcription-file.interface';
import { TranscriptionFileRestService } from '../../service/transcription-file.rest.service';

@Component({
  selector: 'app-transcription-page',
  templateUrl: './transcription-page.component.html',
  styles: [],
})
export class TranscriptionPageComponent implements OnInit, OnDestroy {
  @Input()
  currentTime = 0;

  private subscriptions: Array<Subscription> = [];
  private audioRecordingId = '';
  location: Array<ITranscriptionLocation> = [];
  transcription = '';

  constructor(
    private readonly _transcriptionFileRestService: TranscriptionFileRestService,
    private readonly _appStore: AppStoreService,
  ) {}

  ngOnInit(): void {
    const store$ = this._appStore.store$.subscribe({
      next: (store) => {
        if (store.audioRecordingId && this.audioRecordingId !== store.audioRecordingId) {
          this.getTranscriptionData(store.audioRecordingId);
        }
        this.audioRecordingId = store.audioRecordingId;
      },
    });

    this.subscriptions.push(store$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  getTranscriptionData(audioRecordingId: string): void {
    const get$ = this._transcriptionFileRestService.getOne(audioRecordingId);

    get$.subscribe({
      next: (response) => {
        this.location = response.transcriptionArray;
        this.transcription = response.transcription;
        this._appStore.updateStore('transcription', this.transcription);
        this._appStore.updateStore('transcriptionFileId', response._id);
      },
    });
  }
}
