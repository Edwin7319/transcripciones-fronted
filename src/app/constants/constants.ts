import { ITableColumn } from '../interfaces/interfaces';

export const ROUTES_WITHOUT_HEADER = [];

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
    field: 'createdAt',
    header: 'Fecha de registro',
    minWidth: '60px',
    width: '100px',
    maxWidth: '140px',
  },
  {
    field: 'duration',
    header: 'Longitud de audio',
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
