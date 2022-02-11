import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reporte } from '../_dto/reporte';
import { FiltroReporte } from '../_dto/filtroReporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  urlReporte : string = `${environment.HOST}/reportes`;
  urlDescargar : string = `${environment.HOST}/reportes/descargar`;

  constructor(
    private http: HttpClient
  ) { }

  buscar(filtroReporte : FiltroReporte){
      return this.http.post<Reporte[]>(`${this.urlReporte}`, filtroReporte);
  }

  descargar(filtroReporte : FiltroReporte){
    
    return this.http.post<Reporte[]>(`${this.urlDescargar}`, filtroReporte);
  }
  
}
