import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './pages/principal/principal.component';

import { EstacionComponent } from './pages/estacion/estacion.component';

const routes: Routes = [
  /*{ path : '' , redirectTo:'principal',pathMatch:'full' },
  { path: 'principal', component: PrincipalComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
