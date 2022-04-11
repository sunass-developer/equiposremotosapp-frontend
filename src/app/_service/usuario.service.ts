import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Usuario } from './../_model/usuario';
import { Subject } from 'rxjs';
import { UsuarioItemDto } from './../_dto/UsuarioItemDto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();
  tituloCambio = new Subject<string>();

  url : string = `${environment.HOST}/usuarios`;

  constructor(
    private http : HttpClient
  ) { }

  registrar(usuario : Usuario){
    return this.http.post<Usuario>(this.url, usuario);
  }

  modificar(usuario : Usuario){
    return this.http.put<Usuario>(this.url, usuario);
  }

  listar(){
    return this.http.get<Usuario[]>(this.url);
    //return this.http.get<UsuarioItemDto[]>(this.url);
  }

  listarPorId(id : number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  eliminar(id : number, estado : number){
    return this.http.delete<number>(`${this.url}/${id}/${estado}`);
  }

  habilitar(id : number){
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}
