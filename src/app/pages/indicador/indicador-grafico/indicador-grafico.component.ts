import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IndicadorService } from 'src/app/_service/indicador.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-indicador-grafico',
  templateUrl: './indicador-grafico.component.html',
  styleUrls: ['./indicador-grafico.component.css']
})
export class IndicadorGraficoComponent implements OnInit {

  chart : any;
  id : number;
  tipo: string;
  titulo: string;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private indicadorService : IndicadorService
  ) { }

  ngOnInit(): void {

    this.tipo = 'line';

    this.route.params.subscribe( (params : Params) => {
      this.id = params['id'];
      this.iniciarGrafico(this.id);
    });

  }

  iniciarGrafico(id: number){
    this.indicadorService.listarIndicadoresPorEstacion(id).subscribe(data=>{
      let cloro = data.map(x=> x.cloro);
      let fecharegistro = data.map(x=> x.fecharegistro);
      let ph = data.map(x=> x.ph);
      let temperatura = data.map(x=> x.temperatura);
      let estacion = data.map(x=>x.estacion);

      this.titulo = estacion[0];

      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fecharegistro,
          datasets: [
            {
              label: 'Cloro',
              data: cloro,
              borderColor: "#5883FF",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            },
            {
              label: 'PH',
              data: ph,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
            ,
            {
              label: 'Temperatura',
              data: temperatura,
              borderColor: "#FFC300",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      }); 

    });
  }

  irEstaciones(){
    this.router.navigate(['principal']);
  }

}
