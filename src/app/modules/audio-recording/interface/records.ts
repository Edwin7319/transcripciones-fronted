import { IBaseSchema, IPagination } from '../../../interfaces/interfaces';

export interface IRecords extends IBaseSchema {
  text: string;
  transcriptionFile: string;
  name: string;
  creationTime: number;
}

export interface IRecordsPagination {
  data: Array<IRecords>;
  metadata: Array<IPagination>;
}

export interface IRecordsForm {
  text: string;
  name: string;
}
