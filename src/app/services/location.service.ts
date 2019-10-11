import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  static LOCATION_URL = AppConfig.BASE_URL + "/locations/"

  constructor(
    private http: HttpClient
  ) { }

  get(locationId: String): Observable<Location> {
    return this.http.get(LocationService.LOCATION_URL + locationId).pipe(map(this.toLocation))
  }

  getAll(): Observable<Location[]> {
    return this.http.get(LocationService.LOCATION_URL).pipe(map((res: any[]) => res.map(this.toLocation)))
  }

  create(name: String, level: String, description: String, ac: Boolean) {
    let data = {
      name: name,
      level: level,
      description: description,
      ac: ac
    }
    return this.http.post(LocationService.LOCATION_URL, data)
  }

  update(locationId: String, name: String, level: String, description: String, ac: Boolean) {
    let data = {
      name: name,
      level: level,
      description: description,
      ac: ac
    }
    return this.http.put(LocationService.LOCATION_URL + locationId, data)
  }

  delete(locationId: String) {
    return this.http.delete(LocationService.LOCATION_URL + locationId)
  }

  private toLocation = res => res as Location
}
