import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IndicadorGrafico } from './../_model/indicadorgrafico';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  urlIndicadores : string = `${environment.HOST}/indicadores`;

  constructor(
    private http: HttpClient
  ) { }

  listarIndicadoresPorEstacion(id :number){
    return this.http.get<IndicadorGrafico[]>(`${this.urlIndicadores}/${id}`);
  }
}
