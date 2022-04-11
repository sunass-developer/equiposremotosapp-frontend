import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EstacionService } from './../../_service/estacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Reporte } from '../../_dto/reporte';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroReporte } from '../../_dto/filtroReporte';
import { ReporteService } from './../../_service/reporte.service';
import { EstacionDto } from './../../_dto/EstacionDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';


export interface UserData {
  id: string;
  name: string;
  progress: string;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit,AfterViewInit  {

  form : FormGroup;

  idestacion  : number;
  fechaincioconsulta : Date;
  fechafinconsulta : Date;

  estaciones : EstacionDto[] = [];  
  displayedColumns: string[] = ['nombre', 'fecha', 'cloro', 'ph','temperatura'];
  dataSource: MatTableDataSource<Reporte>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reporte : Reporte[] = [];
  maxFecha : Date = new Date();

  isDisabled : boolean = true;
  contenidoTabla : string = "No existen datos";

  constructor(
    //private datepipe : DatePipe,
    private estacionService : EstacionService,
    private reporteService : ReporteService,
    private snackbar : MatSnackBar
    
  ) { 

    this.dataSource = new MatTableDataSource(this.reporte);

  }

  ngOnInit(): void {   

    this.form = new FormGroup({
      'idEstacion' : new FormControl(),
      'fechaInicioConsulta' : new FormControl(''),
      'fechaFinConsulta' : new FormControl('')
    })

    this.estacionService.listar().subscribe( data=> {
      this.estaciones = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscar(){
    
    this.contenidoTabla = 'Cargando datos...';
    this.idestacion = this.form.value['idEstacion'];
    this.fechaincioconsulta = this.form.value['fechaInicioConsulta'];
    this.fechafinconsulta = this.form.value['fechaFinConsulta'];
    if( ! (this.idestacion>0 && moment(this.fechaincioconsulta,'DD/MM/YYYY',true).isValid() && moment(this.fechafinconsulta,'DD/MM/YYYY',true).isValid())){
      this.snackbar.open('Aviso', 'Debe Seleccionar Estación , Fecha inicio y Fecha fin', {
        duration : 3000
      })
      return;
    }    
    let filtro = new FiltroReporte(this.idestacion,
                                  this.fechaincioconsulta,
                                  this.fechafinconsulta);
    this.reporteService.buscar(filtro).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isDisabled = false;
      if(data.length==0){
        this.contenidoTabla = 'No existen datos';
      }
    });
  }

  descargar(){

    this.idestacion = this.form.value['idEstacion'];
    this.fechaincioconsulta = this.form.value['fechaInicioConsulta'];
    this.fechafinconsulta = this.form.value['fechaFinConsulta'];
    if( ! (this.idestacion>0 && moment(this.fechaincioconsulta,'DD/MM/YYYY',true).isValid() && moment(this.fechafinconsulta,'DD/MM/YYYY',true).isValid())){
      this.snackbar.open('Aviso', 'Debe Seleccionar Estacion , Fecha inicio y Fecha fin', {
        duration : 3000
      })
      return;
    }    
    let miFechainicial = this.fechaincioconsulta.toLocaleDateString().split('/');
    let anioFechainicial = miFechainicial[2]; 
    let mesFechainicial = miFechainicial[1].length<2 ? "0" + miFechainicial[1]  : miFechainicial[1];
    let diaFechainicial = miFechainicial[0].length<2 ? "0" + miFechainicial[0]: miFechainicial[0];
    let miFechafinal = this.fechafinconsulta.toLocaleDateString().split('/');
    let anioFechafinal = miFechafinal[2]; 
    let mesFechafinal = miFechafinal[1].length<2 ? "0"+miFechafinal[1] : miFechafinal[1];
    let diaFechafinal = miFechafinal[0].length<2 ? "0"+miFechafinal[0] : miFechafinal[0];
    window.location.href = this.reporteService.urlDescargar+"/"+this.idestacion+"/"+anioFechainicial+"-"+mesFechainicial+"-"+diaFechainicial+ "/" + anioFechafinal+"-"+mesFechafinal+"-"+diaFechafinal;
  }

  limpiar(){
    this.contenidoTabla = 'No existen datos';
    this.form = new FormGroup({
      'idEstacion' : new FormControl(),
      'fechaInicioConsulta' : new FormControl(''),
      'fechaFinConsulta' : new FormControl('')
    });
    this.dataSource = new MatTableDataSource(this.reporte);
  }

}