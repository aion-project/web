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

  static RESOURCE_URL = AppConfig.BASE_URL + '/resources/';

  constructor(
    private http: HttpClient
  ) { }

  get(resourceId: string): Observable<Resource> {
    return this.http.get(ResourceService.RESOURCE_URL + resourceId).pipe(map(this.toResource));
  }

  getAll(): Observable<Resource[]> {
    return this.http.get(ResourceService.RESOURCE_URL).pipe(map((res: any[]) => res.map(this.toResource)));
  }

  create(name: string, description: string) {
    const data = {
      name,
      description,
    };
    return this.http.post(ResourceService.RESOURCE_URL, data);
  }

  update(resourceId: string, name: string, description: string) {
    const data = {
      name,
      description,
    };
    return this.http.put(ResourceService.RESOURCE_URL + resourceId, data);
  }

  delete(resourceId: string) {
    return this.http.delete(ResourceService.RESOURCE_URL + resourceId);
  }

  private toResource = res => res as Resource;
}
