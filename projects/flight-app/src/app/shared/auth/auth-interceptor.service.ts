import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private storage: OAuthStorage,
    private router: Router) {}

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (req.url.startsWith('http://www.angular.at')) {
      const headers = req.headers.set(
        'Authorization', 'Bearer ' + this.storage.getItem('access_token')
      );

      req = req.clone({ headers })
    }

    return next
            .handle(req)
            .pipe(
              catchError(error => this.handleError(error))
            );
  }

  handleError(event: HttpErrorResponse) {
    if (event.status === 401 || event.status === 403) {
      this.router.navigate(['/home', { needsLogin: true }]);
    }
    return throwError(event);
  }
}
