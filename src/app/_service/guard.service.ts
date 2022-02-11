import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { MenuService } from './menu.service';
import { Menu } from './../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private loginService : LoginService,
    private menuService : MenuService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    //1 verificar si esta logeado
    let rpta = this.loginService.estaLogeado();

    if(!rpta){
      this.loginService.cerrarSesion();
      return false;

    } else{
      //2 verificar si el token no esta expirado
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);

      if(!helper.isTokenExpired(token?.toString())){
        //3 verificar si tienes el rol necesario para acceder a esa pagina
        let url = state.url; // url que el usuario tienne intencion de navegar en este momento
        const decodeToken = helper.decodeToken(token?.toString());

        //nunca en un guard hacer un subscribe
        return this.menuService.listarPorUsuario(decodeToken.user_name).pipe(map((data : Menu[] )=>{
          this.menuService.setMenuCambio(data);
          let cont = 0;
          for (let m of data) {
            if (url.startsWith(m.url)) {
              cont++;
              break;
            }
          }
          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }
        }));
      } else {
        //console.log("else");
        this.loginService.cerrarSesion();
        return false;
      }
    }
    return true;
  }
}
