import { IBaseSchema, IPagination } from '../../../interfaces/interfaces';
import { EAudioRecordingStatus } from '../service/audio-recording.rest.service';

export interface IAudioRecording extends IBaseSchema {
  name: string;
  originalName: string;
  size: string;
  path: string;
  destination: string;
  creationTime: number;
  duration: number;
  copyName: string;
  processStatus: EAudioRecordingStatus;
}

export interface IAudioRecordingPagination {
  data: Array<IAudioRecording>;
  metadata: Array<IPagination>;
}

export interface IAudioRecordingForm {
  name: string;
  file: File;
  duration: number;
}
