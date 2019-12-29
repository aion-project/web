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
import { Assignment } from 'src/app/model/Assignment';
import { AssignUserComponent, AssignUserData } from './assign-user/assign-user.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  private eventId: string

  event: Event
  assignments: Assignment[]
  isAdmin: boolean = false

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.userService.isRole("admin").pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin
    })
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.eventId = map.get("eventId")
      this.fetchEventInfo()
      this.fetchAssignments()
    })
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
          this.router.navigateByUrl("/events")
        })
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
          this.fetchEventInfo()
        })
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
          this.fetchEventInfo()
        });
      }
    });
  }

  // Assignments
  onAssignmentAdd() {
    const dialogRef = this.dialog.open(AssignUserComponent, {
      width: '640px',
      data: {
        current: this.assignments
      } as AssignUserData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.addAssignment(this.eventId, result, "lecturer").toPromise().then(_ => {
          this.fetchAssignments()
        })
      }
    });
  }

  onAssignmentRemove(assignment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.removeAssignment(this.eventId, assignment).toPromise().then(_ => {
          this.fetchAssignments()
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
        console.log(result)
        this.eventService.addGroup(this.eventId, result).toPromise().then(_ => {
          this.fetchEventInfo();
        })
      }
    });
  }

  onGroupRemove(group) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(group)
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
        })
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
      this.event = event
      console.log(event)
    })
  }

  fetchAssignments() {
    this.eventService.getAssignments(this.eventId).pipe(first()).subscribe(assignments => {
      this.assignments = assignments
      console.log(assignments)
    })
  }
}
