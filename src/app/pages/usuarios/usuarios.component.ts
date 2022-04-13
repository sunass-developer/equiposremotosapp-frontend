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
import { UsuarioItemDto } from './../../_dto/UsuarioItemDto';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns = ['nombre', 'apellido', 'username','celular','cargo','rol','ubicacion','estado','acciones'];
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
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(usuario : Usuario, estado : number){
    this.usuarioService.eliminar(usuario.idUsuario,estado).pipe(switchMap(() => {
      return this.usuarioService.listar();
    })).subscribe(data => {
      this.usuarioService.usuarioCambio.next(data);
      if(estado === 0){
        this.usuarioService.mensajeCambio.next('Se Inhabilitado');
      }
      else{
        this.usuarioService.mensajeCambio.next('Se Habilito');
      }
    });
  }
}
