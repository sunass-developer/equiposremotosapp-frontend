import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { PrincipalComponent } from './pages/principal/principal.component';


import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { OlMapComponent } from './pages/ol-map/ol-map.component';
import { IndicadorComponent } from './pages/indicador/indicador.component';
import { IndicadorGraficoComponent } from './pages/indicador/indicador-grafico/indicador-grafico.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LoginComponent } from './pages/login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { UsuarioEdicionComponent } from './pages/usuarios/usuario-edicion/usuario-edicion.component';
import { ReceptorsmsComponent } from './pages/receptorsms/receptorsms.component';
import { EstacionComponent } from './pages/estacion/estacion.component';
import { EstacionEdicionComponent } from './pages/estacion/estacion-edicion/estacion-edicion.component';
import { ReceptorsmsEdicionComponent } from './pages/receptorsms/receptorsms-edicion/receptorsms-edicion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FichadescriptivaComponent } from './pages/fichadescriptiva/fichadescriptiva.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


export function tokenGetter(){
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    OlMapComponent,
    ReportesComponent,
    LoginComponent,
    UsuariosComponent,
    Not403Component,
    Not404Component,
    UsuarioEdicionComponent,
    ReceptorsmsComponent,
    IndicadorComponent,
    IndicadorGraficoComponent,
    EstacionComponent,
    EstacionEdicionComponent,
    ReceptorsmsEdicionComponent,
    InicioComponent,
    FichadescriptivaComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config :  {
        tokenGetter: tokenGetter,
        allowedDomains : ["161.132.207.233:8080"]/*,
        disallowedRoutes : ["http://localhost:8080/login/enviarCorreo"]*/
      }
    })
  ],
  providers: [
    /*{
      provide : HTTP_INTERCEPTORS,
      useClass : ServerErrorsInterceptor,
      multi : true
    },*/
    {
      provide : LocationStrategy,
      useClass : HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
