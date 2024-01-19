import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { APP_ROUTES } from '../../../constants/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [``],
})
export class SidebarComponent {
  @Input()
  list: MenuItem[] = [
    {
      label: 'Administración',
      items: [
        {
          label: 'Registro de usuarios',
          routerLink: APP_ROUTES.user,
        },
        {
          label: 'Manejo de estados de audio',
          routerLink: APP_ROUTES.handlingAudioRecording,
        },
      ],
    },
    {
      label: 'Registro de audio',
      routerLink: APP_ROUTES.audioRecording,
    },
    {
      label: 'Histórico',
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

  constructor(private readonly _router: Router) {}

  executeAction(opcionHija: MenuItem) {
    void this._router.navigate([opcionHija.routerLink]);
  }
}
