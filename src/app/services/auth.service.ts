import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from "../config/app-config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    let body = "grant_type=password&username=" + username + "&password=" + password + "&scope=full"
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(AppConfig.OAUTH_CLIENT_ID + ':' + AppConfig.OAUTH_CLIENT_SECRET)
      })
    }
    return this.http.post(AppConfig.OAUTH_TOKEN_URL, body, options)
      .pipe(map((res: any) => {
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
