import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static BASE_URL = "http://localhost:8080/users/"

  // ENDPOINTS
  static ENDPOINT_ME = "me"
  static ENDPOINT_CREATE = "create"

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
    return this.http.get(UserService.BASE_URL + UserService.ENDPOINT_ME, options)
  }

  getAll() {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    return this.http.get(UserService.BASE_URL, options)
  }

  create(firstname: String, lastname: String, username: String, email: String, password: String) {
    let options = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken()
      })
    }
    let data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    }
    return this.http.post(UserService.BASE_URL + UserService.ENDPOINT_CREATE, data, options)
  }

}
