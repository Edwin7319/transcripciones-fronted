import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styles: [
    `
      input[type='password'],
      input[type='number'],
      input[type='text'],
      textarea {
        -webkit-appearance: none;
        background-color: #f9fafb !important;
        border: 1px solid #d4d4d4;
        border-radius: 8px 0 0 8px;
      }
    `,
  ],
})
export class SearchInputComponent {
  @Input()
  label = 'Buscar';

  @Input()
  placeHolder = '';

  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();

  searchValue = '';

  clickSearchButton() {
    if (!this.searchValue) {
      this.searchEvent.emit('');
      return;
    }
    this.searchEvent.emit(this.searchValue);
  }

  onEnterKey() {
    this.clickSearchButton();
  }
}
