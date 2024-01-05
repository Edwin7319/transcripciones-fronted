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
      routerLink: APP_ROUTES.home,
    },
    {
      label: 'Registro de audio',
      routerLink: APP_ROUTES.audioRecording,
    },
    {
      label: 'Auditoria',
      items: [
        {
          label: 'Registro de audio',
          routerLink: APP_ROUTES.audioRecordingAudit,
        },
        {
          label: 'Transcripciones',
          routerLink: APP_ROUTES.audioRecording,
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
    // private readonly _idZonalService: EstadoGlobalAppService,
  ) {}

  executeAction(opcionHija: MenuItem) {
    if (opcionHija.tabindex) {
      // this._idZonalService.actualizarOpcionMenu(opcionHija.tabindex);
    }
    void this._router.navigate([opcionHija.routerLink]);
  }
}
