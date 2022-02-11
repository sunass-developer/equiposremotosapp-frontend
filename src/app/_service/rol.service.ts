import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from './../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url : string = `${environment.HOST}/roles`;

  constructor(
    private http : HttpClient
  ) { }

  listar(){
    return this.http.get<Rol[]>(this.url);
  }
}
