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

}
