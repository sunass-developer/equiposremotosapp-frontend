import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estacion } from '../_model/estacion';
import { environment } from './../../environments/environment';
import { EstacionIndicador } from '../_model/estacionindicador';

@Injectable({
  providedIn: 'root'
})

export class EstacionService {

  urlEstaciones : string = `${environment.HOST}/estaciones`;
  urlEstacionesIndicadores : string = `${environment.HOST}/estaciones/indicadores`;

  constructor( private http: HttpClient) { }

  listar(){
    return this.http.get<Estacion[]>(this.urlEstaciones);
  }

  listarEstacionesIndicadores(){
    return this.http.get<EstacionIndicador[]>(this.urlEstacionesIndicadores);
  }
}
 
 