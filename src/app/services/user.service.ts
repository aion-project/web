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
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    return this.http.get(UserService.USER_URL + UserService.ENDPOINT_ME, options)
  }

  myRoles() {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    return this.http.get(UserService.USER_URL + UserService.ENDPOINT_ME, options).pipe(map((user: any) => user.roles))
  }

  get(userId: String) {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    return this.http.get(UserService.USER_URL + userId, options)
  }

  getAll() {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    return this.http.get(UserService.USER_URL, options)
  }

  create(firstName: String, lastName: String, username: String, email: String, password: String) {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    let data = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    }
    console.log(data);
    return this.http.post(UserService.USER_URL, data, options)
  }

  addRole(userId: String, roleName: String) {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    let data = {
      roleName: roleName,
    }
    return this.http.post(UserService.USER_URL + userId + "/addRole", data, options)
  }

  removeRole(userId: String, roleName: String) {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    let data = {
      roleName: roleName,
    }
    return this.http.post(UserService.USER_URL + userId + "/removeRole", data, options)
  }
  
  setEnable(userId: String, isEnabled: String) {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    let data = {
      isEnabled: isEnabled,
    }
    return this.http.post(UserService.USER_URL + userId + "/setEnable", data, options)
    
  }

}
