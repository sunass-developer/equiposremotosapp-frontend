import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReceptorSms } from './../_dto/ReceptorSms';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceptorsmsService {

  tituloCambio = new Subject<string>();
  mensajeCambio = new Subject<string>();
  receptorsmsCambio = new Subject<ReceptorSms[]>();

  urlReceptorsms : string = `${environment.HOST}/receptorsms`;

  constructor(
    private http : HttpClient
  ) { }

  registrar(receptorsms : ReceptorSms){
    return this.http.post(this.urlReceptorsms, receptorsms);
  }

  modificar(receptorsms : ReceptorSms){
    return this.http.put(this.urlReceptorsms, receptorsms);
  }

  listar(){
    return this.http.get<ReceptorSms[]>(this.urlReceptorsms);
  }

  listarPorId(idReceptorsms : number){
    return this.http.get<ReceptorSms>(`${this.urlReceptorsms}/${idReceptorsms}`);
  }

  cambiarEstadoHabilitar(idReceptorsms : number, estado:boolean){
    return this.http.delete<number>(`${this.urlReceptorsms}/${idReceptorsms}/${estado}`);
  }
}
