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
    photo:
      // eslint-disable-next-line max-len
      'https://media.licdn.com/dms/image/D4E03AQH-l0bptmnMMQ/profile-displayphoto-shrink_800_800/0/1695403710546?e=1707350400&v=beta&t=LLZyZMMriVPs-01XG7nAL-1hmlTeJSgRb7Ci9vpnUCo',
    email: 'edwin@manticore.com.ec',
    name: 'Edwin Guamushig',
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
