import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UnactiveGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.me().pipe(
      first(),
      map((user: any) => {
        if (!user.active)
          return true;

        this.router.navigate(['/']);
      })
    )
  }
}
