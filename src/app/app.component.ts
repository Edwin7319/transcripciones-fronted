import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';

import { ECookie, ROUTES_WITHOUT_HEADER } from './constants/constants';
import { AppStoreService } from './services/app-store.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'transcripciones';
  showLoader = false;
  showHeader = true;
  showResponsiveSideBar = false;
  route = '';
  user = {
    photo: 'assets/img/user.svg',
    email: 'usuario@email.com',
    name: 'Usuario',
  };

  constructor(
    private _router: Router,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _appStore: AppStoreService,
    private readonly _loaderService: LoaderService,
    private _primeConfig: PrimeNGConfig,
    private readonly _cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.setUserInfo();
    this.updateTextPrimeComponents();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.urlAfterRedirects;
        const routeWithoutQueryParams = this.route.split('?')[0];
        this.showHeader = !ROUTES_WITHOUT_HEADER.some((route) => {
          return routeWithoutQueryParams === `/${route}`;
        });
      }
    });
  }

  private setUserInfo(): void {
    this.user = {
      ...this.user,
      ...jwtDecode(this._cookieService.get(ECookie.token)),
    };
  }

  private updateTextPrimeComponents(): void {
    this._primeConfig.setTranslation({
      matchAll: 'Coincidir todos',
      matchAny: 'Coincidir cualquiera',
      addRule: 'Nueva regla',
      clear: 'Limpiar',
      apply: 'Aplicar',
      startsWith: 'Inicia con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual',
      notEquals: 'No igual',
      removeRule: 'Eliminar regla',
      dateIs: 'Fecha es',
    });
  }

  ngAfterViewChecked(): void {
    this.listenChangesOnLoader();
  }

  listenChangesOnLoader(): void {
    this._loaderService.change.subscribe((state: boolean) => {
      this.showLoader = state;
      this._cdRef.detectChanges();
    });
  }

  closeResponsiveSidebar(): void {
    this.showResponsiveSideBar = !this.showResponsiveSideBar;
    this._appStore.updateStore('showSidebar', this.showResponsiveSideBar);
  }
}
