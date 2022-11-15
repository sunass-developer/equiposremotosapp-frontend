import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { EstacionIndicador } from 'src/app/_model/estacionindicador';
import { EstacionService } from 'src/app/_service/estacion.service';
import { LoginService } from './../../_service/login.service';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css'],
})
export class IndicadorComponent implements OnInit {
  conectado: boolean = true;
  /*private client : Client;*/
  estacionindicador1: EstacionIndicador[] = new Array();
  estacionindicador2: EstacionIndicador[] = new Array();
  estacionindicador3: EstacionIndicador[] = new Array();
  estacionindicador4: EstacionIndicador[] = new Array();
  mostrarcuadroIndicadores: boolean = false;
  logeado : boolean;
  cargandoSpinner : boolean = true;
  cargandoIndicadores : boolean = true;
  llamandoServicioListarEstacionesIndicadores : boolean = true;
  //altoTabla : string = '200px';
  //mostrarCuartoCuadroIndicadores: boolean = false;

  color: ThemePalette = 'primary';
  mode: MatProgressSpinnerModule = 'determinate';
  value = 50;

  constructor(
    private estacionService: EstacionService,
    private loginService : LoginService,
    public route: ActivatedRoute
  ) {
    /*var evtSource = new EventSource("http://localhost:8080/estaciones/indicadores");
      evtSource.onmessage = (e) => {
    }*/
  }

  ngOnInit(): void {
    this.logeado = this.loginService.estaLogeado();
    this.estacionindicador1 = [];

    this.estacionService.
      listarEstacionesIndicadores().subscribe((datos) => {
        for (let i = 0; i < datos.length; i++) {
          this.estacionindicador1.push(datos[i]);
        }
        this.cargandoSpinner = false;
      });
    this.estacionService.listarEstacionesIndicadores().subscribe((datos) => {
      
      for (let i = 0; i < datos.length; i++) {
        this.estacionindicador1.push(datos[i]);
      }
      this.cargandoIndicadores = false;
    },
    err => console.log('HTTP Error', err)
    ,() => console.log('HTTP request completed.'));
  }

  ocultarCuadroIndicadores() {
    this.mostrarcuadroIndicadores = !this.mostrarcuadroIndicadores;
  }
}
