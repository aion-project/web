import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config'
import { map, first, flatMap, tap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import { Event } from '../model/Event';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USER_URL = AppConfig.BASE_URL + "/users/"

  // ENDPOINTS
  static ENDPOINT_ME = "me"
  static ENDPOINT_UPLOAD_AVATAR = "me/uploadAvatar"
  static ENDPOINT_ACTIVATE = "me/activate"
  static ENDPOINT_CHANGE_PASSWORD = "me/changePassword"

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
          this.userSubject.next(user as User)
          return this.userSubject.asObservable()
        })
      )
    } else {
      return this.userSubject.asObservable()
    }
  }

  isRole(role): Observable<Boolean> {
    return this.me().pipe(
      first(),
      map((user: any) => user.roles.some(it => it.name == role))
    )
  }

  activate() {
    return this.http.post(UserService.USER_URL + UserService.ENDPOINT_ACTIVATE, null)
  }

  get(userId: String): Observable<User> {
    return this.http.get(UserService.USER_URL + userId).pipe(map(this.toUser))
  }

  getAll(): Observable<User[]> {
    return this.http.get(UserService.USER_URL).pipe(map((res: any[]) => res.map(this.toUser)))
  }

  getEvents(userId: String): Observable<Event[]> {
    return this.http.get(UserService.USER_URL + userId + "/events").pipe(map((res: any[]) => res.map(this.toEvent)))
  }

  create(firstName: String, lastName: String, email: String, password: String) {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }
    console.log(data);
    return this.http.post(UserService.USER_URL, data)
  }

  update(userId: String, firstName: String, lastName: String, email: String, bio: String) {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      bio: bio,
    }
    return this.http.put(UserService.USER_URL + userId, data)
  }

  delete(userId: String) {
    return this.http.delete(UserService.USER_URL + userId)
  }

  addRole(userId: String, roleId: String) {
    let data = {
      roleId: roleId,
    }
    return this.http.post(UserService.USER_URL + userId + "/addRole", data)
  }

  removeRole(userId: String, roleId: String) {
    let data = {
      roleId: roleId,
    }
    return this.http.post(UserService.USER_URL + userId + "/removeRole", data)
  }

  setEnable(userId: String, isEnabled: Boolean) {
    return this.http.post(UserService.USER_URL + userId + "/setEnable/" + isEnabled, null)
  }
  
  setLocation(userId: String, locationId: String) {
    let data = {
      id: locationId
    }
    return this.http.post(UserService.USER_URL + userId + "/setLocation", data)
  }

  removeLocation(userId: String, locationId: String) {
    let data = {
      id: locationId
    }
    return this.http.post(UserService.USER_URL + userId + "/removeLocation", data)
  }

  uploadAvatar(ext, mime, data) {
    let image = {
      ext: ext,
      mime: mime,
      data: data,
    }
    return this.http.post(UserService.USER_URL + UserService.ENDPOINT_UPLOAD_AVATAR, image)
  }

  changePassword(currentPassword: string, newPassword: string) {
    let data = {
      currentPassword: currentPassword,
      newPassword: newPassword
    }
    return this.http.post(UserService.USER_URL + UserService.ENDPOINT_CHANGE_PASSWORD, data)
  }

  private toUser = res => res as User
  private toEvent = res => res as Event
}
