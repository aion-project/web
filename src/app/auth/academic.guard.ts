import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AcademicGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isRole('academic').pipe(map((isAcademic: boolean) => {
      if (isAcademic) {
        return true;
      }

      this.router.navigate(['/home']);
    }));
  }
}
