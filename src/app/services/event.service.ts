import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Event } from '../model/Event';

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

  create(name: String, description: String, startDateTime: Date, endDateTime: Date, repeat?: String) {
    let data = {
      name: name,
      description: description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      repeat: repeat
    }
    return this.http.post(EventService.EVENT_URL, data)
  }

  update(eventId: String, name: String, description: String, startDateTime: Date, endDateTime: Date, repeat?: String) {
    let data = {
      name: name,
      description: description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      repeat: repeat
    }
    return this.http.put(EventService.EVENT_URL + eventId, data)
  }

  delete(eventId: String) {
    return this.http.delete(EventService.EVENT_URL + eventId)
  }

  private toEvent = res => res as Event
}
