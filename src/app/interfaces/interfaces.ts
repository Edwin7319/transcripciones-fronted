export enum EStatus {
  ENABLED = 1,
  DISABLED = 0,
}

export interface ITableColumn {
  field: string;
  header: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  tipoFiltro?: string;
  campoFiltro?: string;
}

export interface IBaseSchema {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: EStatus;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
}
