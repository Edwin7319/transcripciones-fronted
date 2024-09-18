import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';

import { ECookie, ERole } from '../../../constants/constants';
import { APP_ROUTES } from '../../../constants/routes';
import { IUserPopulated } from '../../../modules/user/interface/user.interface';

interface IMenuItem extends MenuItem {
  items?: Array<IMenuItem>;
  role?: Array<string>;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [``],
})
export class SidebarComponent implements OnInit {
  @Input()
  list: Array<IMenuItem> = [];

  private MENU_OPTIONS: Array<IMenuItem> = [
    {
      label: 'Administración',
      role: [ERole.ADMIN,  ERole.ADMIN_SISTEMA],
      items: [
        {
          label: 'Registro de usuarios',
          routerLink: APP_ROUTES.user,
        },
        {
          label: 'Carga de transcripciones',
          routerLink: APP_ROUTES.handlingAudioRecording,
        },
      ],
    },
    {
      label: 'Registro de audio',
      routerLink: APP_ROUTES.audioRecording,
      role: [ERole.ADMIN, ERole.USER, ERole.ADMIN_SISTEMA],
    },
    {
      label: 'Histórico',
      role: [ERole.ADMIN,  ERole.ADMIN_SISTEMA],
      items: [
        {
          label: 'Registro de audio',
          routerLink: APP_ROUTES.audioRecordingAudit,
        },

        {
          label: 'Actas',
          routerLink: APP_ROUTES.recordsAudit,
        },
      ],
    },
  ];

  constructor(
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.list = this.filterOptionsByRole();
  }

  private filterOptionsByRole(): Array<IMenuItem> {
    const token = this._cookieService.get(ECookie.token);
    const { roles } = jwtDecode<IUserPopulated>(token);

    const userRoles = roles.map((rol) => rol.name.toLowerCase());

    return this.MENU_OPTIONS.filter((option) => {
      return (option.role || []).some((role) => {
        return userRoles.includes(role.toLowerCase());
      });
    });
  }

  executeAction(opcionHija: MenuItem) {
    void this._router.navigate([opcionHija.routerLink]);
  }
}
