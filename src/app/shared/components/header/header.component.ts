import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

import { ICONS } from '../../../constants/constants';
import { APP_ROUTES } from '../../../constants/routes';

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

  @Input()
  user = {
    photo: 'assets/img/user.svg',
    email: 'usuario@email.com',
    name: 'Usuario',
  };

  subscriptions: Array<Subscription> = [];

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
          this._cookieService.deleteAll();
          this._router.navigate([APP_ROUTES.login]);
        });
      },
    },
  ];

  constructor(
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
  ) {
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
