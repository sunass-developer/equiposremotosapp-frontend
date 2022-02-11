import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './pages/principal/principal.component';
import { EstacionGraficoComponent } from './pages/estacion/estacion-grafico/estacion-grafico.component';
import { LoginComponent } from './pages/login/login.component';
import { EstacionComponent } from './pages/estacion/estacion.component';
import { GuardService } from './_service/guard.service';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioEdicionComponent } from './pages/usuarios/usuario-edicion/usuario-edicion.component';
import { MiestacionComponent } from './pages/miestacion/miestacion.component';
import { ReceptorsmsComponent } from './pages/receptorsms/receptorsms.component';

const routes: Routes = [
  /*{ path: 'index', component: PrincipalComponent, children : [
    { path : 'grafico/:id', component: EstacionGraficoComponent }
  ]},*/
  { path : 'principal', component : PrincipalComponent , children : [
      { path : 'grafico/:id', component: EstacionGraficoComponent }
    ] , canActivate : [GuardService]
  },
  { path : 'usuarios', component : UsuariosComponent, children : [
      {path : 'nuevo', component : UsuarioEdicionComponent},
      {path : 'edicion/:id', component : UsuarioEdicionComponent}
    ], canActivate : [GuardService]
  },
  { path: 'miestacion', component: MiestacionComponent, canActivate : [GuardService]},
  { path: 'receptorsms', component: ReceptorsmsComponent, canActivate : [GuardService]},
  { path: 'not-403', component: Not403Component},
  { path: 'not-404', component: Not404Component},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
