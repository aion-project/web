import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  static ROLE_URL = AppConfig.BASE_URL + "/roles"

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(RoleService.ROLE_URL)
  }
}
