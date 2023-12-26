import { IBaseSchema, IPagination } from '../../../interfaces/interfaces';

export interface IAudioRecording extends IBaseSchema {
  name: string;
  originalName: string;
  size: string;
  path: string;
  destination: string;
  creationTime: number;
  duration: number;
  copyName: string;
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
