import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Reschedule } from '../model/Reschedule';
import { Reservation } from '../model/Reservation';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  static RESERVATION_URL = AppConfig.BASE_URL + '/reservation/';

  constructor(
    private http: HttpClient
  ) { }

  getMine(): Observable<Reservation[]> {
    return this.http.get(ReservationService.RESERVATION_URL + 'mine').pipe(map((res: any[]) => res.map(this.toReservation)));
  }

  getOpen(): Observable<Reservation[]> {
    return this.http.get(ReservationService.RESERVATION_URL + 'open').pipe(map((res: any[]) => res.map(this.toReservation)));
  }

  getClosed(): Observable<Reservation[]> {
    return this.http.get(ReservationService.RESERVATION_URL + 'closed').pipe(map((res: any[]) => res.map(this.toReservation)));
  }

  create(event: string, description: string, startDateTime: Date, endDateTime: Date, location: string) {
    const data = {
      event: event,
      description: description,
      startDateTime: moment(startDateTime).utc(true).toISOString(),
      endDateTime: moment(endDateTime).utc(true).toISOString(),
      location: location,
    };
    console.log(data);
    return this.http.post(ReservationService.RESERVATION_URL, data);
  }

  delete(id: string) {
    return this.http.delete(ReservationService.RESERVATION_URL + id);
  }

  accept(id: string) {
    return this.http.post(ReservationService.RESERVATION_URL + id + '/accept', null).pipe(first());
  }

  review(id: string) {
    return this.http.post(ReservationService.RESERVATION_URL + id + '/review', null).pipe(first());
  }

  decline(id: string) {
    return this.http.post(ReservationService.RESERVATION_URL + id + '/decline', null).pipe(first());
  }

  private toReservation = res => res as Reservation;
}
