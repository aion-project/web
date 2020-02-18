import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import rrulePlugin from '@fullcalendar/rrule';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EventRescheduleComponent } from './event-reschedule/event-reschedule.component';
import { ScheduledEvent } from 'src/app/model/ScheduledEvent';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calendarPlugins = [timeGridPlugin, interactionPlugin, rrulePlugin]; // important!
  calendarHeaders = {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay'
  };
  calendarButtons = {
    today: 'Today',
    week: 'Week',
    day: 'Day',
  };
  gridEvents: any[];
  events: ScheduledEvent[];
  user: User;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private eventService: EventService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.me().subscribe(user => {
      this.user = user;
    })
    this.fetchMyEvents();
  }

  fetchMyEvents() {
    this.eventService.getMine().subscribe(events => {
      this.events = events;
      this.gridEvents = events.map(schedule => {
        console.log(schedule);
        const startMoment = moment(schedule.startDateTime).toDate();
        const endMoment = moment(schedule.endDateTime).toDate();
        return {
          groupId: schedule.eventId,
          id: schedule.scheduleId,
          title: schedule.name,
          start: startMoment,
          end: endMoment,
          backgroundColor: schedule.color,
          borderColor: schedule.color
        };
      });
    });
  }

  handleEventClick(event) {
    const eventId = event.event.groupId;
    console.log(event);
    this.router.navigate(['events/listing', eventId]);
  }

  handleEventDrop(event) {
    let reschedulingEvent = this.events.filter(scheduleEvent => {
      return scheduleEvent.eventId === event.event.groupId && scheduleEvent.scheduleId === event.event.id;
    })[0];
    let privilagedUser = reschedulingEvent.users.filter(user => {
      user.id === this.user.id;
    })[0];
    if (privilagedUser) {
      const dialogRef = this.dialog.open(EventRescheduleComponent, {
        width: '640px',
        data: event
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchMyEvents();
          this.snackBar.open("Reschedule request created successfully.", "", {
            duration: 3000
          });
        }
        event.revert();
      });
    } else {
      this.snackBar.open("You are not privilaged to reschedule this event.", "", {
        duration: 3000
      });
      event.revert();
    }
  }
}
