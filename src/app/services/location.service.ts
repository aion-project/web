import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Location } from '../model/Location';
import { Event } from '../model/Event';
import { ScheduledEvent } from '../model/ScheduledEvent';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  static LOCATION_URL = AppConfig.BASE_URL + '/locations/';

  constructor(
    private http: HttpClient
  ) { }

  get(locationId: string): Observable<Location> {
    return this.http.get(LocationService.LOCATION_URL + locationId).pipe(map(this.toLocation));
  }

  getAll(): Observable<Location[]> {
    return this.http.get(LocationService.LOCATION_URL).pipe(map((res: any[]) => res.map(this.toLocation)));
  }

  getEvents(locationId: string): Observable<ScheduledEvent[]> {
    return this.http.get(LocationService.LOCATION_URL + locationId + '/events').pipe(map((res: any[]) => res.map(this.toScheduledEvent)));
  }

  create(name: string, level: string, description: string, quantity: number, ac: boolean) {
    const data = {
      name,
      level,
      description,
      quantity,
      ac
    };
    return this.http.post(LocationService.LOCATION_URL, data);
  }

  update(locationId: string, name: string, level: string, description: string, quantity: number, ac: boolean) {
    const data = {
      name,
      level,
      description,
      quantity,
      ac
    };
    return this.http.put(LocationService.LOCATION_URL + locationId, data);
  }

  delete(locationId: string) {
    return this.http.delete(LocationService.LOCATION_URL + locationId);
  }


  addResource(locationId: string, resourceId: string) {
    const data = {
      resource: resourceId
    };
    return this.http.post(LocationService.LOCATION_URL + locationId + '/addResource', data).pipe(first());
  }

  removeUser(locationId: string, resourceId: string) {
    const data = {
      resource: resourceId
    };
    return this.http.post(LocationService.LOCATION_URL + locationId + '/removeResource', data).pipe(first());
  }

  private toLocation = res => res as Location;
  private toEvent = res => res as Event;
  private toScheduledEvent = res => res as ScheduledEvent;
}
