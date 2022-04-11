import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Provincia } from './../_model/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  ur : string = `${environment.HOST}/provincias`;

  constructor(
    private http : HttpClient
  ) { }

  getAllByDepartamento(iddepartamento : string){
    return this.http.get<Provincia[]>(`${this.ur}/${iddepartamento}`);
  }


}
