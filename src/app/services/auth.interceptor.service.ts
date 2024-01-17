import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, throwError } from 'rxjs';

import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly _router: Router,
    private readonly _loaderService: LoaderService,
    private readonly _toaster: ToastrService,
    private readonly _cookieService: CookieService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._cookieService.get('token');
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    this._loaderService.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = '';
        if (error.error instanceof ErrorEvent) {
          message = error.error.message;
        } else {
          message = `Error: ${error.error.message}`;
        }
        if (error.error?.code === 201) {
          this._toaster.warning(message, 'Advertencia');
        } else {
          this._toaster.error(message, 'Error');
        }
        return throwError(() => new Error(`${message}`));
      }),
      finalize(() => {
        this._loaderService.hidde();
      }),
    );
  }
}
