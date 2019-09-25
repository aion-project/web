import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/app-config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.me().pipe(
      first(),
    ).subscribe(res => {
      this.user = res
      if (this.user.thumbnailUrl != null) {
        let url = AppConfig.BASE_URL + this.user.thumbnailUrl + '?random+\=' + Math.random()
        this.user.thumbnailUrl = url;
      }
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
