import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import * as moment from 'moment';
import { Schedule } from '../model/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  static SCHEDULE_URL = AppConfig.BASE_URL + '/schedule/';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Schedule[]> {
    return this.http.get(ScheduleService.SCHEDULE_URL).pipe(first(), map((res: any[]) => res.map(this.toSchedule)));
  }

  create(startDateTime: Date, endDateTime: Date, until: Date, repeat: string, location: string, event: string) {
    const data = {
      startDateTime: moment(startDateTime).utc(true).toISOString(),
      endDateTime: moment(endDateTime).utc(true).toISOString(),
      until: moment(until).utc(true).toISOString(),
      repeat,
      location,
      event
    };
    console.log(data);
    return this.http.post(ScheduleService.SCHEDULE_URL, data);
  }

  reschedule(eventId: string, scheduleId: string, oldDate: Date, newDate: Date, type: string) {
    const data = {
      oldDateTime: moment(oldDate).utc(true).toISOString(),
      newDateTime: moment(newDate).utc(true).toISOString(),
      type,
      event: eventId
    };
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + '/reschedule', data);
  }

  delete(id: string) {
    return this.http.delete(ScheduleService.SCHEDULE_URL + id);
  }

  setLocation(scheduleId: string, locationId: string) {
    const data = {
      id: locationId
    };
    console.log(data);
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + '/setLocation', data).pipe(first());
  }

  removeLocation(scheduleId: string, locationId: string) {
    const data = {
      id: locationId
    };
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + '/removeLocation', data).pipe(first());
  }

  addUser(scheduleId: string, email: string) {
    const data = {
      email
    };
    console.log(data);
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + '/addUser', data).pipe(first());
  }

  removeUser(scheduleId: string, email: string) {
    const data = {
      email
    };
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + '/removeUser', data).pipe(first());
  }

  private toSchedule = res => res as Schedule;
}
