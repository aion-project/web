import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { UsersEditComponent } from '../users/users-edit/users-edit.component';
import { AppConfig } from 'src/app/config/app-config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchMe()
  }

  onEditProfile() {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMe();
      }
    });
  }

  fetchMe() {
    this.userService.me().pipe(first()).subscribe(user => {
      this.user = user
      if (this.user.avatarUrl != null) {
        this.user.avatarUrl = AppConfig.BASE_URL + this.user.avatarUrl;
      }
    })
  }

}
