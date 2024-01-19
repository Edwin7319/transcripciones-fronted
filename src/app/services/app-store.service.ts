import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IAppStore {
  showSidebar: boolean;
  audioRecordingId: string;
  transcription: string;
  transcriptionFileId: string;
}

export const INITIAL_STATE: IAppStore = {
  showSidebar: false,
  audioRecordingId: '',
  transcription: '',
  transcriptionFileId: '',
};

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private readonly _store = new BehaviorSubject<IAppStore>(INITIAL_STATE);

  public readonly store$ = this._store.asObservable();

  private _data!: IAppStore;

  constructor() {
    this._data = INITIAL_STATE;
  }

  updateStore<T = any>(key: keyof IAppStore, value: T): void {
    this._data = {
      ...this._data,
      [key]: value,
    };
    this.updateStorage(key, value);
    this._store.next(Object.assign({}, this._data));
  }

  resetStore<T = any>(): void {
    this._data = {
      ...INITIAL_STATE,
    };
    this._store.next(Object.assign({}, this._data));
  }

  private updateStorage(key: keyof IAppStore, value: any): void {
    switch (key) {
      case 'showSidebar':
        return;
    }
  }
}
