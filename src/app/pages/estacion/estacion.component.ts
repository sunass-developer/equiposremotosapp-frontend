import { Component, OnInit } from '@angular/core';
import { EstacionService } from './../../_service/estacion.service';
import { EstacionIndicador } from '../../_model/estacionindicador';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css']
})
export class EstacionComponent implements OnInit {

  conectado : boolean =  false;
  /*private client : Client;*/
  estacionindicador1 : EstacionIndicador[] = new Array();
  estacionindicador2 : EstacionIndicador[] = new Array();
  estacionindicador3 : EstacionIndicador[] = new Array();
  mostrarcuadroIndicadores : boolean = false;
  
  constructor(
    private estacionService : EstacionService,
    public route  : ActivatedRoute
  ) {

    /*var evtSource = new EventSource("http://localhost:8080/estaciones/indicadores");

    evtSource.onmessage = (e) => {
      console.log('connection message');
      console.log(e.data);
   }*/
  }

  ngOnInit(): void {

    this.estacionService.listarEstacionesIndicadores().subscribe(datos=>{
      
      this.estacionindicador1.push(datos[0]);
      this.estacionindicador1.push(datos[1]);
      this.estacionindicador1.push(datos[2]);
      this.estacionindicador1.push(datos[3]);

      this.estacionindicador2.push(datos[4]);
      this.estacionindicador2.push(datos[5]);
      
      this.estacionindicador3.push(datos[6]);
      this.estacionindicador3.push(datos[7]);
      this.estacionindicador3.push(datos[8]);
      this.estacionindicador3.push(datos[9]);
    });

    /*this.client = new Client();

    this.client.activate();

    this.client.webSocketFactory = () => {
      console.log("conectado");
      return new SockJS("http://localhost:8080/ws");
    }*/

    /*this.client.onConnect = (frame) => {
      console.log("conectados : " + this.client.connected + " : " + frame );
      this.conectado = true;

      this.client.subscribe('/chat/mensaje', e=> {
        console.log("suscrito");
        this.estacionindicador = JSON.parse(e.body) as EstacionIndicador[];
        
      });
    }*/
  }

  ocultarCuadroIndicadores(){
    this.mostrarcuadroIndicadores = !this.mostrarcuadroIndicadores;
  }

}
