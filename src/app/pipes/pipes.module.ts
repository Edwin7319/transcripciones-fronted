import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ByteToMBytePipe } from './byte-to-megabyte.pipe';
import { SecondToMinutePipe } from './second-to-minute.pipe';

@NgModule({
  declarations: [ByteToMBytePipe, SecondToMinutePipe],
  imports: [CommonModule],
  exports: [ByteToMBytePipe, SecondToMinutePipe],
})
export class PipesModule {}
