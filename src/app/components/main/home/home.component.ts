import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/Event';
import * as moment from 'moment';
import { groupBy, mergeMap, toArray, bufferCount } from 'rxjs/operators';
import { from, of, zip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: any[];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.fetchMyEvents();
  }

  fetchMyEvents() {
    this.eventService.getMine().subscribe(events => {
      from(events).pipe(
        groupBy(event => moment(event.startDateTime).format("dddd")),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        bufferCount(7)
      ).subscribe(groupedEvents => {
        this.events = groupedEvents
      })
    });
  }

}
