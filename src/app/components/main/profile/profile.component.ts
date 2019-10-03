import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { first, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { UsersEditComponent } from '../users/users-edit/users-edit.component';
import { AppConfig } from 'src/app/config/app-config';
import { AvatarUploadComponent } from '../users/user-detail/avatar-upload/avatar-upload.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

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

  onChangeAvatar() {
    const dialogRef = this.dialog.open(AvatarUploadComponent, {
      width: '640px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMe();
      }
    });
  }

  onChangePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '640px'
    });
  }

  fetchMe() {
    this.userService.me(true).pipe(
      filter(user => user != null),
      first(),
    ).subscribe(user => {
      this.user = user
      if (this.user.avatarUrl != null) {
        let url = AppConfig.BASE_URL + this.user.avatarUrl + '?random+\=' + Math.random()
        this.user.avatarUrl = url;
      }
    })
  }

}
