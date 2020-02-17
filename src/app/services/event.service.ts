import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Event } from '../model/Event';
import * as moment from 'moment';
import { ScheduledEvent } from '../model/ScheduledEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static EVENT_URL = AppConfig.BASE_URL + '/events/';

  constructor(
    private http: HttpClient
  ) { }

  get(groupId: string): Observable<Event> {
    return this.http.get(EventService.EVENT_URL + groupId).pipe(first(), map(this.toEvent));
  }

  getAll(): Observable<Event[]> {
    return this.http.get(EventService.EVENT_URL).pipe(first(), map((res: any[]) => res.map(this.toEvent)));
  }

  getMine(): Observable<ScheduledEvent[]> {
    return this.http.get(EventService.EVENT_URL + 'mine').pipe(first(), map((res: any[]) => {
      return res.map(this.toScheduledEvent);
    }));
  }

  create(name: string, description: string) {
    const data = {
      name,
      description
    };
    return this.http.post(EventService.EVENT_URL, data);
  }

  update(eventId: string, name: string, description: string) {
    const data = {
      name,
      description
    };
    console.log(data);
    return this.http.put(EventService.EVENT_URL + eventId, data);
  }

  delete(eventId: string) {
    return this.http.delete(EventService.EVENT_URL + eventId);
  }

  addGroup(eventId: string, groupId: string) {
    const data = {
      id: groupId
    };
    console.log(data);
    return this.http.post(EventService.EVENT_URL + eventId + '/addGroup', data).pipe(first());
  }

  removeGroup(eventId: string, groupId: string) {
    const data = {
      id: groupId
    };
    console.log(data);
    return this.http.post(EventService.EVENT_URL + eventId + '/removeGroup', data).pipe(first());
  }

  setSubject(eventId: string, subjectId: string) {
    const data = {
      id: subjectId
    };
    return this.http.post(EventService.EVENT_URL + eventId + '/setSubject', data);
  }

  removeSubject(eventId: string, subjectId: string) {
    const data = {
      id: subjectId
    };
    return this.http.post(EventService.EVENT_URL + eventId + '/removeSubject', data);
  }

  setLocation(eventId: string, locationId: string) {
    const data = {
      id: locationId
    };
    return this.http.post(EventService.EVENT_URL + eventId + '/setLocation', data);
  }

  removeLocation(eventId: string, locationId: string) {
    const data = {
      id: locationId
    };
    return this.http.post(EventService.EVENT_URL + eventId + '/removeLocation', data);
  }

  private toEvent = res => res as Event;
  private toScheduledEvent = res => res as ScheduledEvent;
}
