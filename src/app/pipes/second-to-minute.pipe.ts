import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondToMinute',
})
export class SecondToMinutePipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value === 0) {
      return 'N/A';
    }

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    return `${this.completeTimeValue(hours)}:${this.completeTimeValue(minutes)}:${this.completeTimeValue(seconds)}`;
  }

  private completeTimeValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
