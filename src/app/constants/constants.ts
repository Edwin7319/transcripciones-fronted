import { ITableColumn } from '../interfaces/interfaces';

import { APP_ROUTES } from './routes';

export const ROUTES_WITHOUT_HEADER = [APP_ROUTES.login];

export const ICONS = {
  PROFILE: 'assets/icons/profile.svg',
  BURGER: 'assets/icons/burger.svg',
  CLOSE: 'assets/icons/close.svg',
  SHOPPING_CAR: 'assets/icons/shopping-car.svg',
};

export const ROWS = 10;

export const ROWS_PAGINATION = [5, 10, 15];

export const FORM_DEBOUNCE_TIME = 200;

export const EMPTY_TEXT = '';

export const DELAY_SEARCH = 1000;

const BASE_AUDIO_RECORDING_TABLE_COLUMNS: Array<ITableColumn> = [
  {
    field: 'size',
    header: 'Detalle',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'processStatus',
    header: 'Estado',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'id',
    header: 'Acciones',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
];

export const AUDIO_RECORDING_TABLE_COLUMNS: Array<ITableColumn> = [
  {
    field: 'code',
    header: 'Código',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'name',
    header: 'Nombre',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'creationTime',
    header: 'Fecha de registro',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  ...BASE_AUDIO_RECORDING_TABLE_COLUMNS,
];

export const HANDLING_AUDIO_TABLE_COLUMNS: Array<ITableColumn> = [
  {
    field: 'user',
    header: 'Usuario',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'name',
    header: 'Información audio',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  ...BASE_AUDIO_RECORDING_TABLE_COLUMNS,
];
export const REPORT_TABLE_COLUMNS: Array<ITableColumn> = [
  {
    field: 'code',
    header: 'Código',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'name',
    header: 'Nombre',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'creationTime',
    header: 'Fecha de registro',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: '_id',
    header: 'Acciones',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
];

export enum EFileType {
  TXT = 'application/octet-stream',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export const AUDIT_TABLE_COLUMNS: Array<ITableColumn> = [
  {
    field: 'schema',
    header: 'Módulo',
    minWidth: '40px',
    width: '60px',
    maxWidth: '100px',
  },
  {
    field: 'user',
    header: 'Usuario',
    minWidth: '40px',
    width: '60px',
    maxWidth: '100px',
  },
  {
    field: 'creationTime',
    header: 'Fecha',
    minWidth: '40px',
    width: '60px',
    maxWidth: '100px',
  },
  {
    field: 'action',
    header: 'Acción',
    minWidth: '40px',
    width: '60px',
    maxWidth: '100px',
  },
  {
    field: 'difference',
    header: 'Diferencia',
    minWidth: '100px',
    width: '150px',
    maxWidth: '200px',
  },
  // {
  //   field: 'id',
  //   header: 'Acciones',
  //   minWidth: '60px',
  //   width: '100px',
  //   maxWidth: '140px',
  // },
];

export const USERS_TABLE_COLUMN: Array<ITableColumn> = [
  {
    field: 'name',
    header: 'Nombre',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },

  {
    field: 'email',
    header: 'Correo',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'creationTime',
    header: 'Fecha de registro',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'institution',
    header: 'Institución',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'roles',
    header: 'Rol',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'status',
    header: 'Estado',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: '_id',
    header: 'Acciones',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
];

export enum EPasswordStatus {
  GENERATED = 'Generada',
  RECOVERY = 'Recuperada',
  VALIDATED = 'Validada',
}

export enum ECookie {
  token = 'token',
  passStatus = 'status',
}

export enum ERole {
  ADMIN_SISTEMA = 'Administrador Sistema',
  USER = 'Usuario',
  ADMIN = 'Administrador',
}
