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

export interface IBaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: EStatus;
}
