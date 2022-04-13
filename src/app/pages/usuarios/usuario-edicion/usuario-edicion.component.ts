import { Component, OnInit } from '@angular/core';
import { Rol } from './../../../_model/rol';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolService } from './../../../_service/rol.service';
import { UsuarioService } from './../../../_service/usuario.service';
import { Usuario } from './../../../_model/usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

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
  rolesEdit : Rol;
  form : FormGroup;
  edicion: boolean = false;
  idRol : number = 0;
  mostrarUbicacion : boolean = false;

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
      'nombre' : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      'apellido' : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      'cargo' : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      'tipousuario' : new FormControl('',Validators.required),
      'correo' : new FormControl('',[Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)]),
      'celular' : new FormControl(''),
      'ubicacion' : new FormControl('')
    });
    this.route.params.subscribe( (params : Params ) => { 
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  get f(){
    return this.form.controls;
  }

  initForm(){
    if (this.edicion) {
      this.usuarioService.listarPorId(this.id).subscribe(data => {
        let id = data.idUsuario;
        let nombre = data.nombre;
        let apellido = data.apellido;
        let username = data.correo.split('@')[0];
        let cargo = data.cargo;
        let correo = data.correo;
        let celular = data.celular;
        let ubicacion = data.ubicacion;
        this.rolesEdit = data.roles[0];
        this.rolesSeleccionados = data.roles;
        this.idRol = data.roles[0].idRol;
        if(this.idRol==3 || this.idRol==4){
          this.mostrarUbicacion = true;
        } else {
          this.mostrarUbicacion = false;
        }
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'apellido': new FormControl(apellido),
          'username': new FormControl(username),
          'cargo': new FormControl(cargo),
          'tipousuario' : new FormControl(this.idRol),
          'correo' : new FormControl(correo),
          'celular' : new FormControl(celular),
          'ubicacion' : new FormControl(ubicacion)
        });
      });
    }
  }

  operar(){
    if(this.form.invalid){
      return ;
    }
    this.usuario.idUsuario = this.form.value['id'];
    this.usuario.nombre = this.form.value['nombre'];
    this.usuario.apellido = this.form.value['apellido'];
    this.usuario.username = this.form.value['correo'].split('@')[0];
    this.usuario.cargo = this.form.value['cargo'];
    this.usuario.correo = this.form.value['correo'];
    this.usuario.celular = this.form.value['celular'];
    this.usuario.ubicacion = this.form.value['ubicacion'];
    //this.usuario.password = '123456';
    this.usuario.password = this.form.value['correo'].split('@')[0]

    this.usuario.enabled = true;
    if(this.usuario!=null && this.usuario.idUsuario >0 ){
      this.rolService.getById(this.idRol).subscribe(data =>{
        this.rolesSeleccionados = [];
        this.rolesSeleccionados.push(data);
        this.rolesSeleccionados;
        this.usuario.roles = this.rolesSeleccionados;
        this.usuarioService.modificar(this.usuario).pipe(switchMap( () =>{
          return this.usuarioService.listar();
        })).subscribe(data=>{
          this.usuarioService.usuarioCambio.next(data);
          this.usuarioService.mensajeCambio.next("Se modifico");
        });
      });
    }else {
      this.rolService.getById(this.idRol).subscribe(data =>{
        this.rolesSeleccionados = [];
        this.rolesSeleccionados.push(data);
        this.rolesSeleccionados;
        this.usuario.roles = this.rolesSeleccionados;
        this.usuarioService.registrar(this.usuario).pipe(switchMap( ()=>{
          return this.usuarioService.listar();
        })).subscribe(data=>{
          this.usuarioService.usuarioCambio.next(data);
          this.usuarioService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.router.navigate(['usuarios']);
  }

  selectRol(){
    if(this.idRol == 3 || this.idRol == 4){
      this.mostrarUbicacion = true;
    } else {
      this.mostrarUbicacion = false;
    }
  }
}
