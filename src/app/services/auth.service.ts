import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static AUTH_BASE_URL = "http://localhost:8081/"

  // ENDPOINTS
  static ENDPOINT_TOKEN = "oauth/token"

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem('token')
  }

  login(username: string, password: string): Observable<Boolean> {
    let body = "grant_type=password&username=" + username + "&password=" + password
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic d2ViOnNlY3JldA=="
      })
    }
    return this.http.post(AuthService.AUTH_BASE_URL + AuthService.ENDPOINT_TOKEN, body, options)
      .pipe(map((res:any) => {
        if (res.access_token) {
          localStorage.setItem("token", res.access_token)
          return true;
        }
        throw "No access token";
        ;
      }))
  }

  logout() {
    localStorage.removeItem('token')
  }
}
