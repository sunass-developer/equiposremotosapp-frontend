import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { EstacionIndicador } from './../_model/estacion/estacionindicador';

@Injectable({
  providedIn: 'root'
})

export class EstacionService {

  url : string = `${environment.HOST}/estaciones`;

  constructor( private http: HttpClient) { }

  listar(){
    return this.http.get<EstacionIndicador[]>(this.url);
  }
}
 
 