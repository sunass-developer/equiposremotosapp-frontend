import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Rol } from './../../_model/rol';
import { RolService } from './../../_service/rol.service';
import { Usuario } from './../../_model/usuario';
import { UsuarioService } from './../../_service/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'apellido', 'username','cargo','acciones'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private usuarioService : UsuarioService,
    private snackBar  : MatSnackBar,
    public route  : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.usuarioService.usuarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.usuarioService.listar().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });    
  }

  filtrar(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(usuario : Usuario){
    this.usuarioService.eliminar(usuario.idUsuario).pipe(switchMap(() => {
      return this.usuarioService.listar();
    })).subscribe(data => {
      this.usuarioService.usuarioCambio.next(data);
      this.usuarioService.mensajeCambio.next('Se eliminó');
    });
    /*this.usuarioService.eliminar(usuario.idUsuario).subscribe(data=>{
      console.log("eliminado");
    });*/
  }

  

}
