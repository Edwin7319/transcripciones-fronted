import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'INFO' | 'LIGHT' | 'SUCCESS' | 'FILE' | 'PRIMARY-OUTLINE';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [],
})
export class ButtonComponent {
  public buttonText = '';

  @Input()
  buttonType: ButtonType = 'PRIMARY';
  @Input()
  isDisabled!: boolean;
  @Input()
  isFormButton = false;
  @Input()
  icon?: string;
  @Input()
  isMaterialIcon = false;
  @Input()
  textSize = 'base';

  @Input()
  set text(name: string) {
    this.buttonText = name.toUpperCase();
  }

  get name(): string {
    return this.buttonText;
  }

  @Output()
  clickAction = new EventEmitter();

  onClick(): void {
    this.clickAction.emit();
  }
}
