import { Component, OnInit } from '@angular/core';
import { Rol } from './../../../_model/rol';
import { FormGroup, FormControl } from '@angular/forms';
import { RolService } from './../../../_service/rol.service';
import { UsuarioService } from './../../../_service/usuario.service';
import { Usuario } from './../../../_model/usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-edicion',
  templateUrl: './usuario-edicion.component.html',
  styleUrls: ['./usuario-edicion.component.css']
})
export class UsuarioEdicionComponent implements OnInit {

  id: number;
  usuario : Usuario;
  rolesSeleccionados : Rol[] = [];
  roles : Rol[]  = [];
  form : FormGroup;
  edicion: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private rolService : RolService,
    private usuarioService : UsuarioService
  ) { }

  ngOnInit(): void {

    this.usuario = new Usuario();

    this.rolService.listar().subscribe( data=>{
      this.roles = data;
    });

    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombre' : new FormControl(),
      'apellido' : new FormControl(''),
      'username' : new FormControl(''),
      'cargo' : new FormControl(''),
      'tipousuario' : new FormControl('')
    });

    this.route.params.subscribe( (params : Params ) => { 
      //console.log(params);
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

  }

  initForm(){
    if (this.edicion) {
      this.usuarioService.listarPorId(this.id).subscribe(data => {
        console.log(data);
        let id = data.idUsuario;
        let nombre = data.nombre;
        let apellido = data.apellido;
        let username = data.username;
        let cargo = data.cargo;
        let rolesEdit = data.roles;
        

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'apellido': new FormControl(apellido),
          'username': new FormControl(username),
          'cargo': new FormControl(cargo)/*,
          'rolesSeleccionados' : new FormControl(rolesEdit)*/
        });
      });
    }
  }

  operar(){

    this.usuario.idUsuario = this.form.value['id'];
    //this.usuario.idUsuario = 4;
    this.usuario.nombre = this.form.value['nombre'];
    this.usuario.apellido = this.form.value['apellido'];
    this.usuario.username = this.form.value['username'];
    this.usuario.cargo = this.form.value['cargo'];
    this.usuario.password = '123456';
    this.usuario.enabled = true;
    this.usuario.roles = this.rolesSeleccionados;

    if(this.usuario!=null && this.usuario.idUsuario >0 ){
      //modificar
      /*this.usuarioService.modificar(this.usuario).subscribe(data=>{
        console.log("modificar");
      });*/
      this.usuarioService.modificar(this.usuario).pipe(switchMap( () =>{
        return this.usuarioService.listar();
      })).subscribe(data=>{
        this.usuarioService.usuarioCambio.next(data);
        this.usuarioService.mensajeCambio.next("Se modifico");
      });

    } else {
      //registrar
      /*this.usuarioService.registrar(this.usuario).subscribe(data=>{
        console.log("se registro usuario");
      });*/
      this.usuarioService.registrar(this.usuario).pipe(switchMap( ()=>{
        return this.usuarioService.listar();
      } )).subscribe(data=>{
        this.usuarioService.usuarioCambio.next(data);
        this.usuarioService.mensajeCambio.next("Se registro");
      });
    }
    this.router.navigate(['usuarios']);
  }

}
