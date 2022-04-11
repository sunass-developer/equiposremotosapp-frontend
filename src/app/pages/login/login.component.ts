import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './../../_service/login.service';
import { MenuService } from './../../_service/menu.service';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioLoginLdapDto } from 'src/app/_dto/usuarioLoginLdapDto';
import { concatMap } from 'rxjs/operators';

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
  estado : boolean;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

    this.loginService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data , 'Aviso',{
        'duration' : 2000
      });
    });
  }

  iniciarSesion() {
    if(this.usuario=='' || this.clave=='' || this.usuario===undefined || this.clave===undefined){
      this.loginService.mensajeCambio.next("Ingrese usuario y/o contraseña");
      return;
    }
    let usuarioLoginLdapDto = new UsuarioLoginLdapDto(this.usuario, this.clave);
    let claveUsuario='';
    this.loginService.loginLdap(usuarioLoginLdapDto).subscribe(data=>{
      if(data){
        claveUsuario ='123456';
      } else{
        claveUsuario = this.clave;
      }
      this.loginService.login(this.usuario,claveUsuario).pipe(concatMap(data=>{
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
        const helper = new JwtHelperService();//envía el token a todas la peticiones http, verifica si el token esta activo o ya expiro
        let decodedToken = helper.decodeToken(data.access_token);
        return this.menuService.listarPorUsuario(decodedToken.user_name);
      })).subscribe(data=>{
        this.menuService.setMenuCambio(data);
        this.router.navigate(['principal']);
      },error=>{
        this.loginService.mensajeCambio.next("Usuario y/o contraseña incorrectos");
      });
    });
  }
}
