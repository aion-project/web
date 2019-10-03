import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { first, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ActiveGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.me(true).pipe(
      filter(user => user != null),
      first(),
      map((user: any) => {
        if (!!user.active)
          return true;

        this.router.navigate(['/activate']);
      })
    )
  }
}
