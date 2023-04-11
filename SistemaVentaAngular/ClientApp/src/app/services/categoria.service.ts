import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiBase: string = '/api/categoria/'
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiBase}Lista`)
  }
}
