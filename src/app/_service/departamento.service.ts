import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Departamento } from './../_model/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url : string = `${environment.HOST}/departamentos`;

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Departamento[]>(this.url);
  }
}
