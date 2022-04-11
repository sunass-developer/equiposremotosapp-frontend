import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceptorSms } from './../../_dto/ReceptorSms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReceptorsmsService } from 'src/app/_service/receptorsms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-receptorsms',
  templateUrl: './receptorsms.component.html',
  styleUrls: ['./receptorsms.component.css']
})
export class ReceptorsmsComponent implements OnInit {

  displayedColumns = ['nombre','apellido','cargo','entidad','dni','celular','correo','estado','acciones'];
  dataSource: MatTableDataSource<ReceptorSms>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private receptorsmsService : ReceptorsmsService,
    private snackBar  : MatSnackBar,
    public route  : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.receptorsmsService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'Aviso',{
        duration : 2000
      });
    });
    this.receptorsmsService.receptorsmsCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.receptorsmsService.listar().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(receptorsms : ReceptorSms, estado : boolean){
    this.receptorsmsService.cambiarEstadoHabilitar(receptorsms.id,estado).pipe( concatMap(()=>{
      return this.receptorsmsService.listar()
    })).subscribe(data=>{
      this.receptorsmsService.receptorsmsCambio.next(data);
      if(estado){
        this.receptorsmsService.mensajeCambio.next('Se habilito Receptor Sms');
      } else{
        this.receptorsmsService.mensajeCambio.next('Se inhabilito Receptor Sms');
      }
    });
  }

  irReceptorsmsNuevo(){
    this.router.navigate(['/receptorsms/nuevo']);
  }

}
