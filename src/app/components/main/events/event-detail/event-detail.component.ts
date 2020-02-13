import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../model/Event';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EventService } from 'src/app/services/event.service';
import { first } from 'rxjs/operators';
import { EventCreateEditComponent } from '../event-create-edit/event-create-edit.component';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { ChangeSubjectComponent } from '../../../common/change-subject/change-subject.component';
import { ChangeLocationComponent } from 'src/app/components/common/change-location/change-location.component';
import { SelectElementType, SelectElementComponent } from 'src/app/components/common/select-element/select-element.component';
import { AssignUserComponent, AssignUserData } from './assign-user/assign-user.component';
import { CreateScheduleData, CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/model/Schedule';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  private eventId: string;

  event: Event;
  isAdmin = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private eventService: EventService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.eventId = map.get('eventId');
      this.fetchEventInfo();
    });
  }

  onEditEvent() {
    const dialogRef = this.dialog.open(EventCreateEditComponent, {
      width: '640px',
      data: this.eventId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEventInfo();
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.delete(this.eventId).toPromise().then(_ => {
          this.router.navigateByUrl('/events');
        });
      }
    });
  }

  // Schedule
  onCreateSchedule() {
    const dialogRef = this.dialog.open(CreateScheduleComponent, {
      width: '640px',
      data: {
        eventId: this.eventId,
        schedules: this.event.schedules
      } as CreateScheduleData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEventInfo();
      }
    });
  }

  onRemoveSchedule(schedule: Schedule) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scheduleService.delete(schedule.id).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }

  onAddUser(schedule: Schedule) {
    const dialogRef = this.dialog.open(AssignUserComponent, {
      width: '640px',
      data: {
        current: schedule.users
      } as AssignUserData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scheduleService.addUser(schedule.id, result.email).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }

  onRemoveUser(schedule: Schedule, user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scheduleService.removeUser(schedule.id, user.email).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }


  // Subject
  onSubjectChange() {
    const dialogRef = this.dialog.open(ChangeSubjectComponent, {
      width: '640px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.eventService.setSubject(this.eventId, result.id).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }

  onSubjectRemove(subject) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.removeSubject(this.eventId, subject.id).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }

  // Group
  onGroupAdd() {
    const dialogRef = this.dialog.open(SelectElementComponent, {
      width: '640px',
      data: { type: SelectElementType.GROUP, current: this.event.groups }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.eventService.addGroup(this.eventId, result).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }

  onGroupRemove(group) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(group);
        this.eventService.removeGroup(this.eventId, group.id).toPromise().then(_ => {
          this.fetchEventInfo();
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
        this.eventService.setLocation(this.eventId, result.id).toPromise().then(_ => {
          this.fetchEventInfo();
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
        this.eventService.removeLocation(this.eventId, location.id).toPromise().then(_ => {
          this.fetchEventInfo();
        });
      }
    });
  }

  fetchEventInfo() {
    this.eventService.get(this.eventId).pipe(first()).subscribe(event => {
      this.event = event;
      console.log(event);
    });
  }
}
