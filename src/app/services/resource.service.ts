import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../model/Resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  static RESOURCE_URL = AppConfig.BASE_URL + "/resources/"

  constructor(
    private http: HttpClient
  ) { }

  get(resourceId: String): Observable<Resource> {
    return this.http.get(ResourceService.RESOURCE_URL + resourceId).pipe(map(this.toResource))
  }

  getAll(): Observable<Resource[]> {
    return this.http.get(ResourceService.RESOURCE_URL).pipe(map((res: any[]) => res.map(this.toResource)))
  }

  // create(name: String, level: String, description: String, ac: Boolean) {
  //   let data = {
  //     name: name,
  //     level: level,
  //     description: description,
  //     ac: ac
  //   }
  //   return this.http.post(LocationService.LOCATION_URL, data)
  // }

  // update(locationId: String, name: String, level: String, description: String, ac: Boolean) {
  //   let data = {
  //     name: name,
  //     level: level,
  //     description: description,
  //     ac: ac
  //   }
  //   return this.http.put(LocationService.LOCATION_URL + locationId, data)
  // }

  // delete(locationId: String) {
  //   return this.http.delete(LocationService.LOCATION_URL + locationId)
  // }

  private toResource = res => res as Resource
}
