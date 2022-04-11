import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EstacionService } from 'src/app/_service/estacion.service';
import { FichadescriptivaService } from './../../_service/fichadescriptiva.service';

@Component({
  selector: 'app-fichadescriptiva',
  templateUrl: './fichadescriptiva.component.html',
  styleUrls: ['./fichadescriptiva.component.css']
})
export class FichadescriptivaComponent implements OnInit {

  id : number;
  nombreArchivo : string = "";

  constructor(
    private route : ActivatedRoute,
    private fichadescriptivaService : FichadescriptivaService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params : Params) => {
      this.id = params['id'];
      this.fichadescriptivaService.listarById(this.id).subscribe(datos=>{
        this.nombreArchivo = datos.ruta;
      });

    });
  }

}
