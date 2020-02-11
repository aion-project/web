import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, first, filter } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/app-config';
import { OktaAuthService } from '@okta/okta-angular';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private oktaService: OktaAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.me(true).pipe(
      filter(user => user != null),
    ).subscribe(res => {
      this.user = res;
      if (this.user.thumbnailUrl != null) {
        const url = AppConfig.BASE_URL + this.user.thumbnailUrl + '?random+\=' + Math.random();
        this.user.thumbnailUrl = url;
      }
      if (!this.user.active) {
        this.router.navigate(['/activate']);
      }
    });
  }

  logout() {
    this.oktaService.logout().then(_ => {
      this.router.navigate(['/login']);
    });
  }

}
