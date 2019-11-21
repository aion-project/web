import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Group } from '../model/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  static LOCATION_URL = AppConfig.BASE_URL + "/groups/"

  constructor(
    private http: HttpClient
  ) { }

  get(groupId: String): Observable<Group> {
    return this.http.get(GroupService.LOCATION_URL + groupId).pipe(first(), map(this.toGroup))
  }

  getAll(): Observable<Group[]> {
    return this.http.get(GroupService.LOCATION_URL).pipe(first(), map((res: any[]) => res.map(this.toGroup)))
  }

  create(name: String, description: String) {
    let data = {
      name: name,
      description: description,
    }
    return this.http.post(GroupService.LOCATION_URL, data)
  }

  update(locationId: String, name: String, description: String) {
    let data = {
      name: name,
      description: description,
    }
    return this.http.put(GroupService.LOCATION_URL + locationId, data)
  }

  delete(locationId: String) {
    return this.http.delete(GroupService.LOCATION_URL + locationId)
  }

  private toGroup = res => res as Group
}
