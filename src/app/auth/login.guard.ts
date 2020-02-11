import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(public oktaService: OktaAuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.oktaService.isAuthenticated().then((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        return true;
      }

      this.router.navigate(['/home']);
    });
  }
}
