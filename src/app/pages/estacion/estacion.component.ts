import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estacion } from './../../_model/estacion';
import { MatSort } from '@angular/material/sort';
import { EstacionService } from 'src/app/_service/estacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionDto } from './../../_dto/EstacionDto';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css']
})
export class EstacionComponent implements OnInit{

  displayedColumns = ['nombre','departamento','provincia','distrito','estado','acciones'];
  dataSource: MatTableDataSource<EstacionDto>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;  
  titulo : string ="LISTADO DE ESTACIONES";
  
  constructor(
    private estacionService : EstacionService,
    private snackBar  : MatSnackBar,
    public route  : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.estacionService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'Aviso',{
        duration : 2000
      });
    });
    this.estacionService.estacionCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.estacionService.listarTodas().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(estacion : Estacion, estado : boolean){

    this.estacionService.cambiarEstadoHabilitar(estacion.id,estado).pipe( switchMap(()=>{
      return this.estacionService.listarTodas()
    })).subscribe(data=>{
      this.estacionService.estacionCambio.next(data);
      if(estado){
        this.estacionService.mensajeCambio.next('Se habilito la estación');
      } else{
        this.estacionService.mensajeCambio.next('Se inhabilito la estación');
      }
      
    });
  }

  irEstacionNuevo(){
    this.router.navigate(['/estacion/nuevo']);
  }

}
