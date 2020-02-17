import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import rrulePlugin from '@fullcalendar/rrule';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { EventRescheduleComponent } from './event-reschedule/event-reschedule.component';

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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.fetchMyEvents();
  }

  fetchMyEvents() {
    this.eventService.getMine().subscribe(events => {
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
    const dialogRef = this.dialog.open(EventRescheduleComponent, {
      width: '640px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMyEvents();
      }
      event.revert();
    });
  }
}
