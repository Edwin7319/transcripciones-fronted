import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { ROWS, ROWS_PAGINATION, USERS_TABLE_COLUMN } from '../../../constants/constants';
import { ITableColumn } from '../../../interfaces/interfaces';
import { IUserForm, IUserPopulated } from '../interface/user.interface';
import { UserModalComponent } from '../modal/user-modal/user-modal.component';
import { UserRestService } from '../service/user.rest.service';

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
  openCreateModal(): void {
    const dialogRef = this._dialog.open(UserModalComponent, {
      width: '50em',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: IUserForm) => {
        if (!result) return;
        this._toaster.success('Usuario registrado', 'Correcto');
        this.getInitialData();
      },
    });
  }
}
