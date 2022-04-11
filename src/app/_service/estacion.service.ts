import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { EstacionIndicador } from '../_model/estacionindicador';
import { Subject, Observable } from 'rxjs';
import { EstacionDto } from './../_dto/EstacionDto';
import { Estacion } from './../_model/estacion';

@Injectable({
  providedIn: 'root'
})

export class EstacionService {

  mensajeCambio = new Subject<string>();
  estacionCambio = new Subject<EstacionDto[]>();

  urlEstaciones : string = `${environment.HOST}/estaciones`;
  urlEstacionesIndicadores : string = `${environment.HOST}/estaciones/indicadores`;

  constructor( private http: HttpClient) { }

  registrar(estacion : Estacion){
    return this.http.post(this.urlEstaciones, estacion);
  }

  modificar(estacion : Estacion){
    return this.http.put(this.urlEstaciones, estacion);
  }

  listar(){
    return this.http.get<EstacionDto[]>(this.urlEstaciones);
  }

  listarPopup(){
    return this.http.get<Estacion[]>(`${this.urlEstaciones}/popup`);
  }

  listarTodas(){
    return this.http.get<EstacionDto[]>(`${this.urlEstaciones}/todas`);
  }

  listarTodosAtributos(){
    return this.http.get<Estacion[]>(`${this.urlEstaciones}/todosatributos`);
  }


  listarEstacionesIndicadores(){
    return this.http.get<EstacionIndicador[]>(this.urlEstacionesIndicadores);
  }

  listarById(idEstacion : number){
    return this.http.get<Estacion>(`${this.urlEstaciones}/${idEstacion}`);
  }

  cambiarEstadoHabilitar(idEstacion : number, estado:boolean){
    return this.http.delete<number>(`${this.urlEstaciones}/${idEstacion}/${estado}`);
  }
}