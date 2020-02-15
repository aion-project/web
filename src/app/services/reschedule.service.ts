import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reschedule } from '../model/Reschedule';

@Injectable({
  providedIn: 'root'
})
export class RescheduleService {

  static RESCHEDULE_URL = AppConfig.BASE_URL + '/reschedule/';

  constructor(
    private http: HttpClient
  ) { }

  getMine(): Observable<Reschedule[]> {
    return this.http.get(RescheduleService.RESCHEDULE_URL + "mine").pipe(map((res: any[]) => res.map(this.toRechedule)));
  }

  getPending(): Observable<Reschedule[]> {
    return this.http.get(RescheduleService.RESCHEDULE_URL + "pending").pipe(map((res: any[]) => res.map(this.toRechedule)));
  }

  private toRechedule = res => res as Reschedule;
}
