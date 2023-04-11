import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';


@Injectable({
  providedIn: 'root'
})
export class RolServicioService {
  apiBase: string = '/api/rol/'
  constructor(private http: HttpClient) { }

  getRoles(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiBase}Lista`)
  }
}
