import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface IAutocomplete {
  value: number | string;
  label: string;
  disabled?: boolean;
  data?: any;
  stateCreate?: boolean;
}

export interface IAutocompleteEvent {
  term: string;
  items: IAutocomplete[];
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [],
})
export class AutocompleteComponent implements OnChanges {
  @Input()
  id = '';
  @Input()
  label = '';
  @Input()
  placeholder = '';
  @Input()
  formGroup!: FormGroup;
  @Input()
  appAutoFocus = false;
  @Input()
  errorMessage = '';
  @Input()
  required = false;
  @Input()
  isMultiple = false;
  @Input()
  hiddeLoading = false;
  @Input()
  readonly = false;
  @Input()
  help?: string;
  @Input()
  options: IAutocomplete[] = [];
  @Input()
  maxSelected = 1;

  @Output()
  blurEvent: EventEmitter<boolean> = new EventEmitter();
  @Output()
  searchEvent: EventEmitter<IAutocompleteEvent> = new EventEmitter();

  @Output()
  changeEvent: EventEmitter<IAutocomplete> = new EventEmitter();

  @Output()
  changeMultipleEvent: EventEmitter<IAutocomplete[]> = new EventEmitter();

  objectError = Object;
  control!: FormControl;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']?.currentValue) {
      this.control = this.formGroup.get(this.id) as FormControl;
    }
  }

  blur(): void {
    this.blurEvent.emit(true);
  }

  onSearch(event: IAutocompleteEvent): void {
    this.searchEvent.emit(event);
  }

  onChange(event: any): void {
    if (this.isMultiple) {
      this.changeMultipleEvent.emit(event);
      return;
    }
    this.changeEvent.emit(event);
  }
}
