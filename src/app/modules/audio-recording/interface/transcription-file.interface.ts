import { IBaseSchema } from '../../../interfaces/interfaces';

export interface ITranscriptionLocation {
  range: {
    startString: string;
    endString: string;
    start: number;
    end: number;
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
