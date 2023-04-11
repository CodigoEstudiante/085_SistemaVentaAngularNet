import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiBase: string = '/api/dashboard/'
  constructor(private http: HttpClient) { }

  resumen(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiBase}Resumen`)
  }
}
