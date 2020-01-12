import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Event } from '../model/Event';
import { Assignment } from '../model/Assignment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static EVENT_URL = AppConfig.BASE_URL + "/events/"

  constructor(
    private http: HttpClient
  ) { }

  get(groupId: String): Observable<Event> {
    return this.http.get(EventService.EVENT_URL + groupId).pipe(first(), map(this.toEvent))
  }

  getAll(): Observable<Event[]> {
    return this.http.get(EventService.EVENT_URL).pipe(first(), map((res: any[]) => res.map(this.toEvent)))
  }

  getMine(): Observable<Event[]> {
    return this.http.get(EventService.EVENT_URL + "mine").pipe(first(), map((res: any[]) => {
      return res.map(this.toEvent)
    }))
  }

  create(name: String, description: String, startDateTime: Date, endDateTime: Date, repeat?: String) {
    let data = {
      name: name,
      description: description,
      startDateTime: moment(startDateTime).utc(true).toISOString(),
      endDateTime: moment(endDateTime).utc(true).toISOString(),
      repeat: repeat
    }
    return this.http.post(EventService.EVENT_URL, data)
  }

  update(eventId: String, name: String, description: String, startDateTime: Date, endDateTime: Date, repeat?: String) {
    let data = {
      name: name,
      description: description,
      startDateTime: moment(startDateTime).utc(true).toISOString(),
      endDateTime: moment(endDateTime).utc(true).toISOString(),
      repeat: repeat
    }
    console.log(data)
    return this.http.put(EventService.EVENT_URL + eventId, data)
  }

  delete(eventId: String) {
    return this.http.delete(EventService.EVENT_URL + eventId)
  }

  addGroup(eventId: string, groupId: String) {
    const data = {
      id: groupId
    }
    console.log(data);
    return this.http.post(EventService.EVENT_URL + eventId + "/addGroup", data).pipe(first());
  }

  removeGroup(eventId: String, groupId: String) {
    const data = {
      id: groupId
    }
    console.log(data);
    return this.http.post(EventService.EVENT_URL + eventId + "/removeGroup", data).pipe(first());
  }

  getAssignments(eventId: string): Observable<Assignment[]> {
    return this.http.get(EventService.EVENT_URL + eventId + "/getAssignments").pipe(first(), map((res: any[]) => res.map(this.toAssignment)))
  }

  addAssignment(eventId: string, email: string, role: string) {
    const data = {
      email: email,
      role: role
    }
    console.log(data);
    return this.http.post(EventService.EVENT_URL + eventId + "/addAssignment", data).pipe(first());
  }

  removeAssignment(eventId: String, assignmentId: String) {
    const data = {
      id: assignmentId
    }
    return this.http.post(EventService.EVENT_URL + eventId + "/removeAssignment", data).pipe(first());
  }

  setSubject(eventId: String, subjectId: String) {
    let data = {
      id: subjectId
    }
    return this.http.post(EventService.EVENT_URL + eventId + "/setSubject", data)
  }

  removeSubject(eventId: String, subjectId: String) {
    let data = {
      id: subjectId
    }
    return this.http.post(EventService.EVENT_URL + eventId + "/removeSubject", data)
  }

  setLocation(eventId: String, locationId: String) {
    let data = {
      id: locationId
    }
    return this.http.post(EventService.EVENT_URL + eventId + "/setLocation", data)
  }

  removeLocation(eventId: String, locationId: String) {
    let data = {
      id: locationId
    }
    return this.http.post(EventService.EVENT_URL + eventId + "/removeLocation", data)
  }

  reschedule(eventId: String, oldDate: Date, newDate: Date) {
    let data = {
      oldDateTime: moment(oldDate).utc(true).toISOString(),
      newDateTime: moment(newDate).utc(true).toISOString()
    }
    return this.http.post(EventService.EVENT_URL + eventId + "/reschedule", data)
  }

  private toEvent = res => res as Event
  private toAssignment = res => res as Assignment
}
