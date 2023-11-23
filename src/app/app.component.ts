import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ROUTES_WITHOUT_HEADER } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'transcripciones';
  showHeader = true;
  showResponsiveAside = true;
  route = '';

  constructor(
    private _router: Router,
    private readonly _cdRef: ChangeDetectorRef,
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

  closeResponsiveAsida(): void {
    this.showResponsiveAside = !this.showResponsiveAside;
  }
}
