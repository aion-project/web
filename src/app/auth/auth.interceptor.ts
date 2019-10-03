import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private oktaService: OktaAuthService
    ) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        return from(this.oktaService.getAccessToken()).pipe(flatMap(token => {
            if (token) {
                const cloned = req.clone({
                    headers: req.headers.set('Authorization', "Bearer " + token)
                });

                return next.handle(cloned);
            } else {
                return next.handle(req);
            }
        }))
    }
}