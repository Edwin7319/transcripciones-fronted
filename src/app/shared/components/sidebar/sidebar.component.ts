import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
      routerLink: '/zonales/tipo',
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
