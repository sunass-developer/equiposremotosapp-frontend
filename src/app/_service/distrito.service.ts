import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Distrito } from './../_model/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  url : string = `${environment.HOST}/distritos`;

  constructor(
    private http : HttpClient
  ) { }


  buscarPorId(id:number){
    return this.http.get<Distrito>(`${this.url}/${id}`);
  }

  findByProvincia(idprovincia : string){
    return this.http.get<Distrito[]>(`${this.url}/provincia/${idprovincia}`);
  }

}
