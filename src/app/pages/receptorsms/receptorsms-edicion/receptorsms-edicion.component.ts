import { Component, OnInit } from '@angular/core';
import { Estacion } from './../../../_model/estacion';
import { ReceptorSms } from './../../../_dto/ReceptorSms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstacionService } from './../../../_service/estacion.service';
import { ReceptorsmsService } from 'src/app/_service/receptorsms.service';
import { concatMap } from 'rxjs/operators';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-receptorsms-edicion',
  templateUrl: './receptorsms-edicion.component.html',
  styleUrls: ['./receptorsms-edicion.component.css']
})
export class ReceptorsmsEdicionComponent implements OnInit {

  id: number;
  receptorsms : ReceptorSms;
  estaciones : Estacion[]  = [];
  estacionSeleccionada : Estacion;
  form : FormGroup;
  edicion: boolean = false;
  idEstacion : number = 0;
  hidePassword : boolean = true;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private estacionService : EstacionService,
    private receptorsmsService : ReceptorsmsService
  ) { }

  ngOnInit(): void {

    this.receptorsms = new ReceptorSms();
    this.estacionService.listarTodosAtributos().subscribe( data=>{
      this.estaciones = data;
    });
    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombre' : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      'apellido' : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      'cargo' : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      'entidad' : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      'dni' : new FormControl('',[Validators.minLength(8), Validators.maxLength(8)]),
      'celular' : new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^((\\9-?)|0)?[0-9]{9}$')]),
      'correo' : new FormControl('',[Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)]),
      'estacionSeleccionada' : new FormControl('', Validators.required)
    });
    this.route.params.subscribe( (params : Params ) => { 
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if (this.edicion) {
      this.receptorsmsService.listarPorId(this.id).subscribe(data => {
        let id = data.id;
        let nombre = data.nombre;
        let apellido = data.apellido;
        let cargo = data.cargo;
        let entidad = data.entidad;
        let dni = data.dni;
        let celular = data.celular;
        let correo = data.correo;
        this.form = new FormGroup({
          'id' : new FormControl(0),
          'nombre' : new FormControl(id,[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
          'apellido' : new FormControl(nombre,[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
          'cargo' : new FormControl(cargo,[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
          'entidad' : new FormControl(entidad,[Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
          'dni' : new FormControl(dni,[Validators.minLength(8), Validators.maxLength(8)]),
          'celular' : new FormControl(celular,[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^((\\9-?)|0)?[0-9]{9}$')]),
          'correo' : new FormControl(correo,[Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)]),
          'estacionSeleccionada' : new FormControl('', Validators.required)
        });
        this.estacionSeleccionada = data.estacion;
      });
    }
  }

  get f(){
    return this.form.controls;
  }

  operar(){
    if(this.form.invalid){
      return;
    }
    this.receptorsms.id = this.form.value['id'];
    this.receptorsms.nombre = this.form.value['nombre'];
    this.receptorsms.apellido = this.form.value['apellido'];
    this.receptorsms.cargo = this.form.value['cargo'];
    this.receptorsms.entidad = this.form.value['entidad'];
    this.receptorsms.dni = this.form.value['dni'];
    this.receptorsms.celular = this.form.value['celular'];
    this.receptorsms.correo = this.form.value['correo'];
    this.receptorsms.estacion = this.estacionSeleccionada;
    this.receptorsms.estado = true;
    if(this.receptorsms!=null && this.receptorsms.id >0 ){
      this.receptorsmsService.modificar(this.receptorsms).pipe(concatMap( () =>{
        return this.receptorsmsService.listar();
      })).subscribe(data=>{
        this.receptorsmsService.receptorsmsCambio.next(data);
        this.receptorsmsService.mensajeCambio.next("Se modifico");
      });
    } else {
      this.receptorsmsService.registrar(this.receptorsms).pipe(concatMap( ()=>{
        return this.receptorsmsService.listar();
      } )).subscribe(data=>{
        this.receptorsmsService.receptorsmsCambio.next(data);
        this.receptorsmsService.mensajeCambio.next("Se registro");
      });
    }
    this.router.navigate(['receptorsms']);
  }

  compararNombres( receptorsms1:ReceptorSms, receptorsms2:ReceptorSms) {
    if (receptorsms1==null || receptorsms2==null) {
      return false;
    }
    return receptorsms1.id===receptorsms2.id;
  }

}