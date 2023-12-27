import { IBaseSchema } from '../../../interfaces/interfaces';

export interface ITranscriptionLocation {
  range: {
    init: string;
    end: string;
  };
  text: string;
}
export interface ITranscriptionFile extends IBaseSchema {
  transcriptionLocation: string;
  transcription: string;
  transcriptionLocationPath: string;
  transcriptionPath: string;
  transcriptionArray: Array<ITranscriptionLocation>;
  audioRecording: string;
}
