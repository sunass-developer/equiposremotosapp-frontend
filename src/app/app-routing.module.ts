import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './pages/principal/principal.component';
import { IndicadorGraficoComponent } from './pages/indicador/indicador-grafico/indicador-grafico.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './_service/guard.service';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioEdicionComponent } from './pages/usuarios/usuario-edicion/usuario-edicion.component';
import { ReceptorsmsComponent } from './pages/receptorsms/receptorsms.component';
import { EstacionComponent } from './pages/estacion/estacion.component';
import { EstacionEdicionComponent } from './pages/estacion/estacion-edicion/estacion-edicion.component';
import { ReceptorsmsEdicionComponent } from './pages/receptorsms/receptorsms-edicion/receptorsms-edicion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FichadescriptivaComponent } from './pages/fichadescriptiva/fichadescriptiva.component';

const routes: Routes = [
  { path : 'principal', component : PrincipalComponent , children : [
      { path : 'grafico/:id', component: IndicadorGraficoComponent }/*,
      {path : 'fichadescriptiva/:id', component : FichadescriptivaComponent}*/
    ]/* , canActivate : [GuardService]*/
  },
  { path : 'inicio', component : InicioComponent , children : [
      { path : 'grafico/:id', component: IndicadorGraficoComponent }/*,
      {path : 'fichadescriptiva/:id', component : FichadescriptivaComponent}*/
    ]
  },
  { path : 'usuarios', component : UsuariosComponent, children : [
      {path : 'nuevo', component : UsuarioEdicionComponent},
      {path : 'edicion/:id', component : UsuarioEdicionComponent}
    ]/*, canActivate : [GuardService]*/
  },
  { path: 'estacion', component: EstacionComponent, children : [
      { path : 'nuevo', component : EstacionEdicionComponent},
      { path : 'edicion/:id', component : EstacionEdicionComponent}
    ]/*, canActivate : [GuardService]*/
  },
  {
    path : 'receptorsms', component : ReceptorsmsComponent, children : [
      { path : 'nuevo', component : ReceptorsmsEdicionComponent},
      { path : 'edicion/:id', component : ReceptorsmsEdicionComponent},
    ] /*, canActivate : [GuardService]*/
  },
  { path: 'not-403', component: Not403Component},
  { path: 'not-404', component: Not404Component},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
