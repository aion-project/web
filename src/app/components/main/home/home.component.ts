import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import rrulePlugin from '@fullcalendar/rrule';
import { RRule, RRuleSet } from 'rrule';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventType } from 'src/app/model/Event';
import { MatDialog } from '@angular/material';
import { EventRescheduleComponent } from './event-reschedule/event-reschedule.component';
import { keyframes } from '@angular/animations';

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
  }
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
      this.gridEvents = events.map(event => {
        let startMoment = moment(event.startDateTime)
        let endMoment = moment(event.endDateTime)
        let duration = moment.utc(endMoment.diff(startMoment)).format("HH:mm")
        let ruleSet = new RRuleSet();
        if (event.repeat === EventType.NONE) {
          ruleSet.rrule(new RRule({
            freq: RRule.WEEKLY,
            count: 1,
            dtstart: startMoment.utc(true).toDate()
          }))
        } else if (event.repeat === EventType.DAILY) {
          ruleSet.rrule(new RRule({
            freq: RRule.DAILY,
            dtstart: startMoment.utc(true).toDate()
          }))
        } else if (event.repeat === EventType.WEEKLY) {
          ruleSet.rrule(new RRule({
            freq: RRule.WEEKLY,
            byweekday: +startMoment.format("e") - 1,
            dtstart: startMoment.utc(true).toDate()
          }))
        }
        ruleSet.exdate(startMoment.add(1, 'week').utc(true).toDate())
        console.log(duration)
        return {
          id: event.id,
          title: event.name,
          rrule: ruleSet.toString(),
          duration: duration
        }
      })
    });
  }

  handleEventClick(event) {
    let eventId = event.event._def.publicId
    console.log(eventId)
    this.router.navigate(['events/listing', eventId])
  }

  handleEventDrop(event) {
    const dialogRef = this.dialog.open(EventRescheduleComponent, {
      width: '640px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO - Implement
      } else {
        event.revert();
      }
    });
  }

}
