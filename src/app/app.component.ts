import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ROUTES_WITHOUT_HEADER } from './constants/constants';
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
    photo:
      // eslint-disable-next-line max-len
      'https://media.licdn.com/dms/image/D4E03AQH-l0bptmnMMQ/profile-displayphoto-shrink_800_800/0/1695403710546?e=1707350400&v=beta&t=LLZyZMMriVPs-01XG7nAL-1hmlTeJSgRb7Ci9vpnUCo',
    email: 'edwin@manticore.com.ec',
    name: 'Edwin Guamushig',
  };

  constructor(
    private _router: Router,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _appStore: AppStoreService,
    private readonly _loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
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
