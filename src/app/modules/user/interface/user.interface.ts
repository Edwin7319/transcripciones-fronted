import { IBaseSchema, IPagination } from '../../../interfaces/interfaces';

export interface IUser extends IBaseSchema, IUserForm {
  creationTime: number;
  password: string;
  passwordStatus: string;
}
export interface IUserPopulated extends IBaseSchema {
  email: string;
  name: string;
  lastName: string;
  creationTime: number;
  password: string;
  passwordStatus: string;
  roles: Array<IRole>;
}

export interface IUserForm {
  email: string;
  name: string;
  lastName: string;
  roles: Array<string>;
}

export interface IUserPagination {
  data: Array<IUser>;
  metadata: Array<IPagination>;
}

export interface IUserPaginationPopulated {
  data: Array<IUserPopulated>;
  metadata: Array<IPagination>;
}

export interface IRole extends IBaseSchema {
  name: string;
  description: string;
}
