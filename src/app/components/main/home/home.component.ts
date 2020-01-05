import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventType } from 'src/app/model/Event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calendarPlugins = [timeGridPlugin]; // important!
  calendarHeaders = {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay'
  };
  calendarButtons = {
      today:    'Today',
      week:     'Week',
      day:      'Day',
  }
  gridEvents: any[];

  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.fetchMyEvents();
  }

  fetchMyEvents() {
    this.eventService.getMine().subscribe(events => {
      this.gridEvents = events.map(event => {
        if (event.repeat === EventType.NONE) {
          return {
            id: event.id,
            title: event.name,
            start: event.startDateTime,
            end: event.endDateTime
          }
        } else if (event.repeat === EventType.DAILY) {
          return {
            id: event.id,
            title: event.name,
            startTime: moment(event.startDateTime).format("HH:mm"),
            endTime: moment(event.endDateTime).format("HH:mm")
          }
        } else if (event.repeat === EventType.WEEKLY) {
          return {
            id: event.id,
            title: event.name,
            daysOfWeek: [moment(event.startDateTime).format("e")],
            startTime: moment(event.startDateTime).format("HH:mm"),
            endTime: moment(event.endDateTime).format("HH:mm")
          }
        }
       
      })
    });
  }

  handleEventClick(event) {
    let eventId = event.event._def.publicId
    console.log(eventId)
    this.router.navigate(['events/listing', eventId])
  }

}
