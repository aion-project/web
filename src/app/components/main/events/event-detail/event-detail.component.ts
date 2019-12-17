import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../model/Event';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EventService } from 'src/app/services/event.service';
import { first } from 'rxjs/operators';
import { EventCreateEditComponent } from '../event-create-edit/event-create-edit.component';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  private eventId: String

  event: Event
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

  fetchEventInfo() {
    this.eventService.get(this.eventId).pipe(first()).subscribe(event => {
      this.event = event
    })
  }
}
