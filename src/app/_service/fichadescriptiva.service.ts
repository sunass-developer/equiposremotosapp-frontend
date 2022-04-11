import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FichaDescriptiva } from '../_dto/fichaDescriptiva';

@Injectable({
  providedIn: 'root'
})
export class FichadescriptivaService {

  url : string = `${environment.HOST}/fichadescriptiva`;

  constructor(private http : HttpClient) { }

  listarById(id : number){
    return this.http.get<FichaDescriptiva>(`${this.url}/${id}`);
  }
}
