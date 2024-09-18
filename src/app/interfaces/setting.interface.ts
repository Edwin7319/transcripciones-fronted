import { IBaseSchema, IPagination } from './interfaces';

export type TUserStatus = 'Activo' | 'Inactivo';
export interface ISettingPopulated extends Omit<IBaseSchema, 'status'> {
  name: string;
  code: string;
  value: string;
  creationTime: number;
  status: TUserStatus;
}

export interface ISettingPaginationPopulated {
  data: Array<ISettingPopulated>;
  metadata: Array<IPagination>;
}
