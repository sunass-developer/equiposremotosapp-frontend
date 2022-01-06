import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { PrincipalComponent } from './pages/principal/principal.component';


import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { OlMapComponent } from './pages/ol-map/ol-map.component';
import { EstacionComponent } from './pages/estacion/estacion.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    OlMapComponent,
    EstacionComponent
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
  ],
  providers: [
    /*{
      provide : LocationStrategy, useClass : HashLocationStrategy
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
