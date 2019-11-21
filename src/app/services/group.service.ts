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

  static GROUP_URL = AppConfig.BASE_URL + "/groups/"

  constructor(
    private http: HttpClient
  ) { }

  get(groupId: String): Observable<Group> {
    return this.http.get(GroupService.GROUP_URL + groupId).pipe(first(), map(this.toGroup))
  }

  getAll(): Observable<Group[]> {
    return this.http.get(GroupService.GROUP_URL).pipe(first(), map((res: any[]) => res.map(this.toGroup)))
  }

  create(name: String, description: String) {
    let data = {
      name: name,
      description: description,
    }
    return this.http.post(GroupService.GROUP_URL, data)
  }

  update(groupId: String, name: String, description: String) {
    let data = {
      name: name,
      description: description,
    }
    return this.http.put(GroupService.GROUP_URL + groupId, data)
  }

  delete(groupId: String) {
    return this.http.delete(GroupService.GROUP_URL + groupId)
  }

  private toGroup = res => res as Group
}
