import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstacionIndicador } from 'src/app/_model/estacionindicador';
import { EstacionService } from 'src/app/_service/estacion.service';

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
  //mostrarCuartoCuadroIndicadores: boolean = false;

  constructor(
    private estacionService: EstacionService,
    public route: ActivatedRoute
  ) {
    /*var evtSource = new EventSource("http://localhost:8080/estaciones/indicadores");

    evtSource.onmessage = (e) => {
   }*/
  }

  ngOnInit(): void {
    this.estacionindicador1 = [];
    this.estacionindicador2 = [];
    this.estacionindicador3 = [];
    this.estacionindicador4 = [];
    //this.mostrarCuartoCuadroIndicadores = false;

    this.estacionService.
      listarEstacionesIndicadores().
      subscribe((datos) => {
        /*this.estacionindicador1.push(datos[0]);
        this.estacionindicador1.push(datos[1]);
        this.estacionindicador1.push(datos[2]);
        this.estacionindicador1.push(datos[3]);
        this.estacionindicador2.push(datos[4]);
        this.estacionindicador2.push(datos[5]);
        this.estacionindicador3.push(datos[6]);
        this.estacionindicador3.push(datos[7]);
        this.estacionindicador3.push(datos[8]);
        this.estacionindicador3.push(datos[9]);
        for (let i = 10; i < datos.length; i++) {
          this.mostrarCuartoCuadroIndicadores = true;
          this.estacionindicador4.push(datos[i]);
        }*/
        for (let i = 0; i < datos.length; i++) {
          //this.mostrarCuartoCuadroIndicadores = true;
          this.estacionindicador1.push(datos[i]);
        }
      });
  }

  ocultarCuadroIndicadores() {
    this.mostrarcuadroIndicadores = !this.mostrarcuadroIndicadores;
  }
}
