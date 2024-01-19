import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

import { ECookie } from '../constants/constants';
import { APP_ROUTES } from '../constants/routes';
import { IUserPopulated } from '../modules/user/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this._cookieService.get(ECookie.token);
    if (!token) {
      void this._router.navigate([APP_ROUTES.login]);
      return false;
    }

    const { roles: userRoles } = jwtDecode<IUserPopulated>(token);

    const appRoles = ((route.data as any).roles || []) as Array<string>;

    const matchRoles = userRoles.filter((roleU) => {
      return appRoles.some((roleA) => roleA.toLowerCase() === roleU.name.toLowerCase());
    }).length;

    if (!matchRoles) {
      void this._router.navigate([APP_ROUTES.login]);
      return false;
    }

    return true;
  }
}
