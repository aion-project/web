import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  static ROLE_URL = AppConfig.BASE_URL + '/roles';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Role[]> {
    return this.http.get(RoleService.ROLE_URL).pipe(map((res: any[]) => res.map(this.toRole)));
  }

  private toRole = res => res as Role;
}
