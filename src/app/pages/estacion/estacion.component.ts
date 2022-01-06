import { Component, OnInit } from '@angular/core';
import { EstacionService } from './../../_service/estacion.service';
import { EstacionIndicador } from './../../_model/estacion/estacionindicador';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css']
})
export class EstacionComponent implements OnInit {

  conectado : boolean =  false;
  /*private client : Client;*/
  estacionindicador : EstacionIndicador[];
  breakpoint : number = 0;
  
  
  constructor(private estacionService : EstacionService) {

    /*var evtSource = new EventSource("http://localhost:8080/estaciones/indicadores");

    evtSource.onmessage = (e) => {
      console.log('connection message');
      console.log(e.data);
   }*/
  }

  ngOnInit(): void {

    this.breakpoint = (window.innerWidth<=700) ? 2 : ((window.innerWidth<=1000) ? 3 : ( (window.innerWidth<=1800) ?4 : ((window.innerWidth<=2500) ? 5 : 6 )));

    this.estacionService.listar().subscribe(datos=>{
      this.estacionindicador = datos;
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

}
