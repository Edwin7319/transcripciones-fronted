import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppStoreService } from '../../../../services/app-store.service';
import { ITranscriptionLocation } from '../../interface/transcription-file.interface';
import { TranscriptionFileRestService } from '../../service/transcription-file.rest.service';

@Component({
  selector: 'app-transcription-page',
  templateUrl: './transcription-page.component.html',
  styles: [],
})
export class TranscriptionPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer')
  scrollContainer!: ElementRef;
  @ViewChild('highlightedSection')
  highlightedSection!: ElementRef;

  @Input()
  currentTime = 0;

  private subscriptions: Array<Subscription> = [];
  location: Array<ITranscriptionLocation> = [];
  transcription = '';

  constructor(
    private readonly _transcriptionFileRestService: TranscriptionFileRestService,
    private readonly _appStore: AppStoreService,
  ) {}

  ngOnInit(): void {
    const store$ = this._appStore.store$.subscribe({
      next: (store) => {
        if (store.audioRecordingId) {
          this.getTranscriptionData(store.audioRecordingId);
        }
      },
    });

    this.subscriptions.push(store$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngAfterViewInit() {
    if (this.highlightedSection.nativeElement) {
      this.highlightedSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getTranscriptionData(audioRecordingId: string): void {
    const get$ = this._transcriptionFileRestService.getOne(audioRecordingId);

    get$.subscribe({
      next: (response) => {
        this.location = response.transcriptionArray;
        this.transcription = response.transcription;
      },
    });
  }
}
