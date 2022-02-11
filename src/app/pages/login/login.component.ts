import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './../../_service/login.service';
import { MenuService } from './../../_service/menu.service';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /*ngAfterViewInit() {
    (window as any).initialize();
  }*/

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {

      //console.log(this.loginService.estaLogeado());

      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      const helper = new JwtHelperService();//envía el token a todas la peticiones http, verifica si el token esta activo o ya expiro 

      let decodedToken = helper.decodeToken(data.access_token);
      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        console.log(data);
        this.menuService.setMenuCambio(data);
        this.router.navigate(['principal']);
      });
      
    });
  }

  ingresar(){

  }

}
