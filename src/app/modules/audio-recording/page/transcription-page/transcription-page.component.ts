import { Component } from '@angular/core';

import { TEXT_LOCATION, TEXT_TRANSCRIPTION } from '../../constants/mock';

@Component({
  selector: 'app-transcription-page',
  templateUrl: './transcription-page.component.html',
  styles: [],
})
export class TranscriptionPageComponent {
  location = TEXT_LOCATION;
  transcription = TEXT_TRANSCRIPTION;
}
