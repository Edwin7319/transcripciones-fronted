import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICONS } from '../../../constants/constants';

interface INavbarItem {
  icon: string;
  label: string;
  roles: Array<string>;
  url?: string;
  description?: string;
  action: () => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent implements OnDestroy {
  @Output()
  clickAction = new EventEmitter();

  @Input()
  ruta = '';

  subscriptions: Array<Subscription> = [];

  user = {
    photo: 'assets/img/user.svg',
    email: 'usuario@email.com',
    name: 'Usuario',
  };

  icons = ICONS;
  existUser = false;
  showUserOptions = false;

  navBarOptions: Array<INavbarItem> = [
    {
      icon: 'car',
      label: 'Cerrar sesión',
      description: '',
      roles: [],
      action: (): void => {
        this._router.navigate([]).then(() => {
          this.showUserOptions = false;
        });
      },
    },
  ];

  constructor(private readonly _router: Router) {
    this.existUser = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  changeUserShowOptions(): void {
    this.showUserOptions = !this.showUserOptions;
  }

  goToPage(route = ''): void {
    this._router.navigate(route.split(',')).then(() => {
      // this.changeUserShowOptions();
      this.showUserOptions = false;
    });
  }

  showSidebarOption(): void {
    this.clickAction.emit('clic');
  }
}
