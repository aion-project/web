import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first, repeat } from 'rxjs/operators';
import * as moment from 'moment';
import { Schedule } from '../model/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  static SCHEDULE_URL = AppConfig.BASE_URL + "/schedule/"

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Schedule[]> {
    return this.http.get(ScheduleService.SCHEDULE_URL).pipe(first(), map((res: any[]) => res.map(this.toSchedule)))
  }

  create(startDateTime: Date, endDateTime: Date, repeat: String, location: String, event: String) {
    let data = {
      startDateTime: moment(startDateTime).utc(true).toISOString(),
      endDateTime: moment(endDateTime).utc(true).toISOString(),
      repeat: repeat,
      location: location,
      event: event
    }
    console.log(data)
    return this.http.post(ScheduleService.SCHEDULE_URL, data)
  }

  delete(id: String) {
    return this.http.delete(ScheduleService.SCHEDULE_URL + id)
  }

  setLocation(scheduleId: string, locationId: string) {
    const data = {
      id: locationId
    }
    console.log(data);
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + "/setLocation", data).pipe(first());
  }

  removeLocation(scheduleId: String, locationId: String) {
    const data = {
      id: locationId
    }
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + "/removeLocation", data).pipe(first());
  }

  addUser(scheduleId: String, email: string) {
    const data = {
      email: email
    }
    console.log(data);
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + "/addUser", data).pipe(first());
  }

  removeUser(scheduleId: String, email: String) {
    const data = {
      email: email
    }
    return this.http.post(ScheduleService.SCHEDULE_URL + scheduleId + "/removeUser", data).pipe(first());
  }

  private toSchedule = res => res as Schedule
}
