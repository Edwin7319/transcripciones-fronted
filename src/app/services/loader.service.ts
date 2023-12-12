import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  load = false;
  change: EventEmitter<boolean> = new EventEmitter();

  show(): void {
    this.load = true;
    this.change.emit(true);
  }

  hidde(): void {
    setTimeout(() => {
      this.load = false;
      this.change.emit(false);
    }, 500);
  }
}
