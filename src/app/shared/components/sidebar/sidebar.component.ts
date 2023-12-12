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
      items: [
        {
          label: 'Gestión de grupos',
          routerLink: '/zonales/tipo',
        },
        {
          label: 'Gestión de fechas cortas',
          routerLink: '/zonales/tipo',
        },
        {
          label: 'Descuento por rangos',
          routerLink: '/zonales/tipo',
        },
        {
          label: 'Descuento por lanzamiento',
          routerLink: '/zonales/tipo',
        },
        {
          label: 'Tabla de descuentos especiales',
          routerLink: '/zonales/tipo',
        },
        {
          label: 'Reportes',
          routerLink: '/zonales/tipo',
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
