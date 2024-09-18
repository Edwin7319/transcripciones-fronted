import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { ROWS, ROWS_PAGINATION, USERS_TABLE_COLUMN } from '../../../constants/constants';
import { ITableColumn } from '../../../interfaces/interfaces';
import { IUserForm, IUserPopulated } from '../interface/user.interface';
import { UserModalComponent } from '../modal/user-modal/user-modal.component';
import { UserRestService } from '../service/user.rest.service';
import { SettingRestService } from '../../../services/rest/setting.rest.service';
import { ISettingPaginationPopulated, ISettingPopulated } from '../../../interfaces/setting.interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styles: [],
})
export class UserPageComponent implements OnInit {
  data: Array<IUserPopulated> = [];
  rows = ROWS;
  rowsPerPage = ROWS_PAGINATION;
  totalRecords = 0;
  columns: Array<ITableColumn> = [...USERS_TABLE_COLUMN];

  constructor(
    private readonly _toaster: ToastrService,
    private readonly _dialog: MatDialog,
    private readonly _userService: UserRestService,
    private readonly _settingRestService: SettingRestService,
  ) {}

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    const getAll$ = this._userService.getAll();

    getAll$.subscribe({
      next: (response) => {
        const { data, metadata } = response;
        this.data = data;
        this.totalRecords = metadata[0].total;
      },
    });
  }

  validateMaxUsersToRegister(rowData?: IUserPopulated): void {
    if (!rowData) {
      const setting$ = this._settingRestService.getByCode('001');
      setting$.subscribe({
        next: (settings: ISettingPaginationPopulated) => {
          const value = settings.data?.length ? +settings.data[0].value : 0;

          if (value) {
            if (this.totalRecords < value) {
              this.openCreateOrEditModal(rowData);
            } else {
              this._toaster.warning('Ha excedido la cantidad máxima de usuarios a registrar', 'Advertencia');
            }
          } else {
            this._toaster.warning('No se ha encontraado la cantidad máxima de usuarios a registrar', 'Advertencia');
          }
        },
      });
    } else {
      this.openCreateOrEditModal(rowData);
    }
  }

  openCreateOrEditModal(rowData?: IUserPopulated): void {
    let user = undefined;

    if (rowData) {
      user = {
        ...rowData,
        roles: rowData.roles.map((r) => r._id),
      };
    }

    const dialogRef = this._dialog.open(UserModalComponent, {
      width: '50em',
      data: user,
    });

    dialogRef.afterClosed().subscribe({
      next: (result: IUserForm) => {
        if (!result) return;
        this._toaster.success('Usuario registrado', 'Correcto');
        this.getInitialData();
      },
    });
  }

  async updateStatus(user: IUserPopulated): Promise<void> {
    const modalResponse = await this.showConfirmModal(user, user.status === 'Activo' ? 'Deshabilitar' : 'Habilitar');
    if (modalResponse.isDismissed) return;

    const update$ = this._userService.updateStatus(user._id, user.status === 'Activo' ? 'Inactivo' : 'Activo');

    update$.subscribe({
      next: (response) => {
        const index = this.data.findIndex((d) => d._id === user._id);
        this.data[index] = response;
      },
    });
  }

  private async showConfirmModal(param: IUserPopulated, text: 'Deshabilitar' | 'Habilitar'): Promise<SweetAlertResult> {
    return Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      title: 'Actualizar estado',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: text,
      width: 600,
      padding: '0.5em',
      html: `
      <div style="text-align: left; font-size: 15px;">
        <span>¿Está seguro en ${text.toLowerCase()} al usuario <strong>${param.name} ${param.lastName}</strong>?.</span>
        <br>
        <span>${
          text === 'Deshabilitar' ? 'Ten en cuenta que un usuario deshabilitado no podrá ingresar al sistema' : ''
        }</span>
     </div>
    `,
      confirmButtonColor: '#012e54',
      cancelButtonColor: '#890000',
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: 'Cancelar',
      iconColor: '#000000',
    });
  }
}
