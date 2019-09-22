import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppConfig } from '../config/app-config'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USER_URL = AppConfig.BASE_URL + "/users/"

  // ENDPOINTS
  static ENDPOINT_ME = "me"

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  me() {
    return this.http.get(UserService.USER_URL + UserService.ENDPOINT_ME)
  }

  myRoles() {
    return this.http.get(UserService.USER_URL + UserService.ENDPOINT_ME).pipe(map((user: any) => user.roles))
  }

  get(userId: String) {
    return this.http.get(UserService.USER_URL + userId)
  }

  getAll() {
    return this.http.get(UserService.USER_URL)
  }

  create(firstName: String, lastName: String, username: String, email: String, password: String) {
    let data = {
      firstName: firstName,
      lastName: lastName,
      username: username,
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

  addRole(userId: String, roleName: String) {
    let data = {
      roleName: roleName,
    }
    return this.http.post(UserService.USER_URL + userId + "/addRole", data)
  }

  removeRole(userId: String, roleName: String) {
    let data = {
      roleName: roleName,
    }
    return this.http.post(UserService.USER_URL + userId + "/removeRole", data)
  }
  
  setEnable(userId: String, isEnabled: Boolean) {

    return this.http.post(UserService.USER_URL + userId + "/setEnable/" + isEnabled, null)
  }
}
