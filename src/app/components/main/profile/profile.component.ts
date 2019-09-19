import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.me().pipe(first()).subscribe(user => {
      this.user = user
    })
  }

}
