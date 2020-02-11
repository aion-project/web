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

  static GROUP_URL = AppConfig.BASE_URL + '/groups/';

  constructor(
    private http: HttpClient
  ) { }

  get(groupId: string): Observable<Group> {
    return this.http.get(GroupService.GROUP_URL + groupId).pipe(first(), map(this.toGroup));
  }

  getAll(): Observable<Group[]> {
    return this.http.get(GroupService.GROUP_URL).pipe(first(), map((res: any[]) => res.map(this.toGroup)));
  }

  create(name: string, description: string) {
    const data = {
      name,
      description,
    };
    return this.http.post(GroupService.GROUP_URL, data);
  }

  update(groupId: string, name: string, description: string) {
    const data = {
      name,
      description,
    };
    return this.http.put(GroupService.GROUP_URL + groupId, data);
  }

  delete(groupId: string) {
    return this.http.delete(GroupService.GROUP_URL + groupId);
  }

  addUser(groupId: string, userId: string) {
    const data = {
      user: userId
    };
    return this.http.post(GroupService.GROUP_URL + groupId + '/addUser', data).pipe(first());
  }

  removeUser(groupId: string, userId: string) {
    const data = {
      user: userId
    };
    return this.http.post(GroupService.GROUP_URL + groupId + '/removeUser', data).pipe(first());
  }

  private toGroup = res => res as Group;
}
