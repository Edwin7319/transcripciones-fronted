import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondToMinute',
})
export class SecondToMinutePipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value === 0) {
      return 'N/A';
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
