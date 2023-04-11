import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Venta } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  apiBase: string = '/api/venta/'
  constructor(private http: HttpClient) { }

 registrar(request: Venta): Observable<ResponseApi> {

   return this.http.post<ResponseApi>(`${this.apiBase}Registrar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

 }

  historal(buscarPor:string,numeroVenta:string,fechaInicio:string,fechaFin:string): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.apiBase}Historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

  }

  reporte(fechaInicio: string, fechaFin: string): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.apiBase}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

  }
}
