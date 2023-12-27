import { Injectable } from '@angular/core';

import { IAppStore } from './app-store.service';

export enum LocalStorageEnum {}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private static getItem(key: string): string {
    return localStorage.getItem(key) || '';
  }

  getAppStore(): IAppStore {
    return {
      showSidebar: false,
      audioRecordingId: '',
    };
  }

  clearStorage(): void {}
}
