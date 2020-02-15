import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { map, first, flatMap, tap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import { Event } from '../model/Event';
import { ScheduledEvent } from '../model/ScheduledEvent';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USER_URL = AppConfig.BASE_URL + '/users/';

  // ENDPOINTS
  static ENDPOINT_ME = 'me';
  static ENDPOINT_UPLOAD_AVATAR = 'me/uploadAvatar';
  static ENDPOINT_ACTIVATE = 'me/activate';
  static ENDPOINT_CHANGE_PASSWORD = 'me/changePassword';

  private userSubject = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) {

  }

  me(force: boolean = false): Observable<User> {
    if (force || !this.userSubject.value) {
      return this.http.get(UserService.USER_URL + UserService.ENDPOINT_ME).pipe(
        first(),
        flatMap(user => {
          this.userSubject.next(user as User);
          return this.userSubject.asObservable();
        })
      );
    } else {
      return this.userSubject.asObservable();
    }
  }

  isRole(role): Observable<boolean> {
    return this.me().pipe(
      first(),
      map((user: any) => user.roles.some(it => it.name === role))
    );
  }

  isRoleIn(roles: String[]): Observable<boolean> {
    return this.me().pipe(
      first(),
      map((user: any) => user.roles.some(it => roles.includes(it.name)))
    );
  }

  activate() {
    return this.http.post(UserService.USER_URL + UserService.ENDPOINT_ACTIVATE, null);
  }

  get(userId: string): Observable<User> {
    return this.http.get(UserService.USER_URL + userId).pipe(map(this.toUser));
  }

  getAll(): Observable<User[]> {
    return this.http.get(UserService.USER_URL).pipe(map((res: any[]) => res.map(this.toUser)));
  }

  getEvents(userId: string): Observable<ScheduledEvent[]> {
    return this.http.get(UserService.USER_URL + userId + '/events').pipe(map((res: any[]) => res.map(this.toScheduledEvent)));
  }

  getAvailable(time: Date): Observable<User[]> {
    return this.http.get(UserService.USER_URL + 'available', {
      params: { time: moment(time).utc(true).toISOString() }
    }).pipe(map((res: any[]) => {
      console.log(res);
      return res.map(this.toUser);
    }));
  }

  create(firstName: string, lastName: string, email: string, password: string) {
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(data);
    return this.http.post(UserService.USER_URL, data);
  }

  update(userId: string, firstName: string, lastName: string, email: string, bio: string) {
    const data = {
      firstName,
      lastName,
      email,
      bio,
    };
    return this.http.put(UserService.USER_URL + userId, data);
  }

  delete(userId: string) {
    return this.http.delete(UserService.USER_URL + userId);
  }

  addRole(userId: string, roleId: string) {
    const data = {
      roleId,
    };
    return this.http.post(UserService.USER_URL + userId + '/addRole', data);
  }

  removeRole(userId: string, roleId: string) {
    const data = {
      roleId,
    };
    return this.http.post(UserService.USER_URL + userId + '/removeRole', data);
  }

  setEnable(userId: string, isEnabled: boolean) {
    return this.http.post(UserService.USER_URL + userId + '/setEnable/' + isEnabled, null);
  }

  setLocation(userId: string, locationId: string) {
    const data = {
      id: locationId
    };
    return this.http.post(UserService.USER_URL + userId + '/setLocation', data);
  }

  removeLocation(userId: string, locationId: string) {
    const data = {
      id: locationId
    };
    return this.http.post(UserService.USER_URL + userId + '/removeLocation', data);
  }

  uploadAvatar(ext, mime, data) {
    const image = {
      ext,
      mime,
      data,
    };
    return this.http.post(UserService.USER_URL + UserService.ENDPOINT_UPLOAD_AVATAR, image);
  }

  changePassword(currentPassword: string, newPassword: string) {
    const data = {
      currentPassword,
      newPassword
    };
    return this.http.post(UserService.USER_URL + UserService.ENDPOINT_CHANGE_PASSWORD, data);
  }

  private toUser = res => res as User;
  private toEvent = res => res as Event;
  private toScheduledEvent = res => res as ScheduledEvent;
}
