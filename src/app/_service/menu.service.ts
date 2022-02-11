import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from './../_model/menu';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuCambio = new Subject<Menu[]>();
  url : string = `${environment.HOST}/menus`;

  constructor(
    private http: HttpClient
  ) { }

  getMenuCambio(){
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus : Menu[]){
    this.menuCambio.next(menus);
  }

  listar(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<Menu[]>(`${this.url}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string){

    //return this.http.post<Menu[]>(`${this.url}/usuario`,nombre);
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
