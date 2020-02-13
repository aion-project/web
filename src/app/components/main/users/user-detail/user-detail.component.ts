import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SelectRoleComponent } from './select-role/select-role.component';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { AppConfig } from 'src/app/config/app-config';
import { GroupService } from 'src/app/services/group.service';
import { SelectElementComponent, SelectElementType } from 'src/app/components/common/select-element/select-element.component';
import { ChangeLocationComponent } from '../../../common/change-location/change-location.component';
import * as moment from 'moment';
import * as DateUtil from 'src/app/utils/date-util';
import { Event } from 'src/app/model/Event';
import { CheckAvailabilityComponent } from 'src/app/components/common/check-availability/check-availability.component';
import { ScheduledEvent } from 'src/app/model/ScheduledEvent';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  private userId: string;

  user: any = [];
  events: ScheduledEvent[];
  currentEvents: ScheduledEvent[];
  isAdmin = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.userId = map.get('userId');
      this.fetchUserInfo();
      this.fetchEvents();
    });
  }

  onEditProfile() {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      width: '640px',
      data: this.userId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUserInfo();
      }
    });
  }

  // Roles
  onRoleAdd() {
    const dialogRef = this.dialog.open(SelectRoleComponent, {
      width: '320px',
      data: { type: null, currentRoles: this.user.roles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addRole(this.userId, result).toPromise().then(_ => {
          this.fetchUserInfo();
        });
      }
    });
  }

  onRoleRemove(roleId) {
    this.userService.removeRole(this.userId, roleId).toPromise().then(_ => {
      this.fetchUserInfo();
    });
  }

  // Groups
  onGroupAdd() {
    const dialogRef = this.dialog.open(SelectElementComponent, {
      width: '640px',
      data: { type: SelectElementType.GROUP, current: this.user.groups }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.addUser(result, this.userId).toPromise().then(_ => {
          this.fetchUserInfo();
        });
      }
    });
  }

  onGroupRemove(groupId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.removeUser(groupId, this.userId).toPromise().then(_ => {
          this.fetchUserInfo();
        });
      }
    });
  }

  // Location
  onLocationChange() {
    const dialogRef = this.dialog.open(ChangeLocationComponent, {
      width: '640px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.setLocation(this.userId, result.id).toPromise().then(_ => {
          this.fetchUserInfo();
        });
      }
    });
  }

  onLocationRemove(location) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.removeLocation(this.userId, location.id).toPromise().then(_ => {
          this.fetchUserInfo();
        });
      }
    });
  }

  onSetEnable(isEnable) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.setEnable(this.userId, isEnable).toPromise().then(_ => {
          this.fetchUserInfo();
        });
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(this.userId).toPromise().then(_ => {
          this.router.navigateByUrl('/users');
        });
      }
    });
  }

  onCheckAvailability() {
    this.dialog.open(CheckAvailabilityComponent, {
      width: '640px',
      data: { events: this.events }
    });
  }

  fetchUserInfo() {
    this.userService.get(this.userId).pipe(first()).subscribe(user => {
      this.user = user;
      console.log(user);
      if (this.user.avatarUrl != null) {
        this.user.avatarUrl = AppConfig.BASE_URL + this.user.avatarUrl;
      }
    });
  }

  fetchEvents() {
    this.userService.getEvents(this.userId).pipe(first()).subscribe(events => {
      this.events = events;
      this.currentEvents = DateUtil.getEventAt(events, moment(Date.now()).toISOString());
    });
  }
}
