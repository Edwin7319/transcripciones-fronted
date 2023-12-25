import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToMByte',
})
export class ByteToMBytePipe implements PipeTransform {
  transform(value: number): number {
    if (isNaN(value) || value === 0) {
      return 0;
    }

    const megaByte = value / (1024 * 1024);
    return Number(megaByte.toFixed(2));
  }
}
