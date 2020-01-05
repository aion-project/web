import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';

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
        return {
          id: event.id,
          title: event.name,
          start: event.startDateTime,
          end: event.endDateTime
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
