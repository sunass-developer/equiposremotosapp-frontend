import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import View from 'ol/View';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Departamento } from './../../../_model/departamento';
import { DepartamentoService } from './../../../_service/departamento.service';
import { ProvinciaService } from './../../../_service/provincia.service';
import { Provincia } from './../../../_model/provincia';
import { Distrito } from './../../../_model/distrito';
import { DistritoService } from './../../../_service/distrito.service';
import { EstacionService } from 'src/app/_service/estacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Estacion } from './../../../_model/estacion';
import { Operador } from './../../../_model/operador';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, map, concatMap } from 'rxjs/operators';
import { UploadFilesService } from './../../../_service/upload-files.service';
import { EstacionFileDto } from './../../../_dto/EstacionFileDto';
import { ArchivoDto } from '../../../_dto/ArchivoDto';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { Modify } from 'ol/interaction';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estacion-edicion',
  templateUrl: './estacion-edicion.component.html',
  styleUrls: ['./estacion-edicion.component.css'],
})
export class EstacionEdicionComponent implements OnInit {
  id: number = 0;
  form: FormGroup;
  nombre: string;
  did : string;
  nombreArchivo: string;
  departamentos: Departamento[];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  departamentoSeleccionado: string;
  provinciaSeleccionada: string;
  distritoSeleccionado: string;
  direccion: string;
  localidad : string;
  nombreAdministrador: string;
  apellidoAdministrador: string;
  dniAdministrador: string;
  telefonoAdministrador: string;
  correoAdministrador: string;
  nombreOperador: string;
  apellidoOperador: string;
  dniOperador: string;
  telefonoOperador: string;
  correoOperador: string;
  edicion: boolean = false;
  estacion: Estacion;
  operadoresSeleccionados: Operador[] = [];
  archivoDto: ArchivoDto;
  mensaje: string;
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'dni',
    'telefono',
    'accion',
  ];
  dataSource = new MatTableDataSource<Operador>(this.operadoresSeleccionados);
  selectedFiles: FileList;
  fileName: string = '';
  map: Map;
  projection: Projection;
  view: View;
  features = new Array();
  coordx: string;
  coordy: string;
  iconFeature = new Feature({
    geometry: new Point([-8376396.24, -1058157.71]),
    name: 'Estacion',
    population: 4000,
    rainfall: 500,
  });

  constructor(
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private estacionService: EstacionService,
    private route: ActivatedRoute,
    private router: Router,
    private UploadFilesService: UploadFilesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    proj4.defs(
      'EPSG:3857',
      '+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs'
    );
    register(proj4);
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 20],
        anchorYUnits: 'pixels',
        src: 'assets/img/marcador-estacion-celeste.png',
      }),
    });
    this.iconFeature.setStyle(iconStyle);
    const vectorSource = new VectorSource({
      features: [this.iconFeature],
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });
    const target = document.getElementById('mapa-estacion');
    const map = new Map({
      layers: [rasterLayer, vectorLayer],
      target: target,
      view: new View({
        projection: 'EPSG:3857',
        zoom: 5,
        center: fromLonLat([-70.6480952, -7.195992], 'EPSG:3857'),
      }),
    });
    const modify = new Modify({
      hitDetection: vectorLayer,
      source: vectorSource,
    });
    modify.on(['modifystart', 'modifyend'], function (evt) {
      target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
    });
    map.addInteraction(modify);
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      did: new FormControl('' , [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ]),
      localidad: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ]),
      nombreAdministrador: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150),
      ]),
      apellidoAdministrador: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150),
      ]),
      dniAdministrador: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^0[1-9]|[1-9]'),
      ]),
      telefonoAdministrador: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^((\\9-?)|0)?[0-9]{9}$'),
      ]),
      correoAdministrador: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(150),
      ]),
      nombreOperador: new FormControl(''),
      apellidoOperador: new FormControl(''),
      dniOperador: new FormControl(''),
      telefonoOperador: new FormControl(''),
      correoOperador: new FormControl(''),
      distrito: new FormControl('', Validators.required),
    });
    this.departamentoService.getAll().subscribe((data) => {
      this.departamentos = data;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.estacion = new Estacion();

    if (this.edicion) {
      this.estacionService
        .listarById(this.id)
        .pipe(
          map((data) => {
            let id = data.id;
            let nombre = data.nombre;
            this.did = data.did;
            let direccion = data.direccion;
            let localidad = data.localidad;
            let nombreAdministrador = data.nombreadministrador;
            let apellidoAdministrador = data.apellidoadministrador;
            let dniAdministrador = data.dniadministrador;
            let telefonoAdministrador = data.telefonoadministrador;
            let correoAdministrador = data.correoadministrador;
            this.iconFeature.setGeometry(
              new Point([Number(data.coordx), Number(data.coordy)])
            );
            let idDistrito = data.distrito.id;
            let idProvincia = data.distrito.provincia.id;
            let idDepartamento = data.distrito.provincia.departamento.id;
            this.departamentoSeleccionado = idDepartamento;
            this.buscarProvincias(idDepartamento);
            this.provinciaSeleccionada = idProvincia;
            this.buscarDistritos(idProvincia);
            this.distritoSeleccionado = idDistrito;
            this.operadoresSeleccionados = data.operadores;
            this.dataSource = new MatTableDataSource(
              this.operadoresSeleccionados
            );
            this.form = new FormGroup({
              id: new FormControl(id),
              nombre: new FormControl(nombre, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150),
              ]),
              did: new FormControl({value : this.did, disabled: true }, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10),
              ]),
              direccion: new FormControl(direccion, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250),
              ]),
              localidad: new FormControl(localidad, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250),
              ]),
              nombreAdministrador: new FormControl(nombreAdministrador, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150),
              ]),
              apellidoAdministrador: new FormControl(apellidoAdministrador, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150),
              ]),
              dniAdministrador: new FormControl(dniAdministrador, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
                Validators.pattern('^0[1-9]|[1-9]'),
              ]),
              telefonoAdministrador: new FormControl(telefonoAdministrador, [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9),
                Validators.pattern('^((\\9-?)|0)?[0-9]{9}$'),
              ]),
              correoAdministrador: new FormControl(correoAdministrador, [
                Validators.required,
                Validators.email,
                Validators.minLength(4),
                Validators.maxLength(150),
              ]),
              nombreOperador: new FormControl(''),
              apellidoOperador: new FormControl(''),
              dniOperador: new FormControl(''),
              telefonoOperador: new FormControl(''),
              correoOperador: new FormControl(''),
              distrito: new FormControl(data.distrito.id, Validators.required),
            });
            return id;
          })
        )
        .pipe(
          concatMap((data) => {
            return this.UploadFilesService.getFiles(Number(data)).pipe(
              map((data) => {
                this.archivoDto = data;
                return this.archivoDto.nombre;
              })
            );
          })
        )
        .subscribe((data) => {
          this.fileName = data;
        });
    }
  }

  buscarProvincias(idDepartamento: string) {
    this.provinciaService
      .getAllByDepartamento(idDepartamento)
      .subscribe((data) => {
        this.provincias = data;
      });
  }

  buscarDistritos(idprovincia: string) {
    this.distritoService.findByProvincia(idprovincia).subscribe((data) => {
      this.distritos = data;
    });
  }

  operar() {
    /*if (this.selectedFiles == undefined && this.fileName == '') {
      this.snackBar.open('Aviso', 'falta adjuntar ficha descriptiva', {
        duration: 3000,
      });
      return;
    }*/
    if (this.operadoresSeleccionados.length == 0) {
      this.snackBar.open('Aviso', 'Debe agregar al menos 1 operador', {
        duration: 3000,
      });
      return;
    }
    if (this.form.invalid) return;
    //console.log(this.form);
    let coordenada = this.iconFeature.getGeometry().getCoordinates().toString().split(',');
    this.coordx = coordenada[0];
    this.coordy = coordenada[1];
    this.estacion.id = this.form.value['id'];
    this.estacion.nombre = this.form.value['nombre'];
    this.estacion.did = this.did;
    this.estacion.direccion = this.form.value['direccion'];
    this.estacion.localidad = this.form.value['localidad'];
    this.estacion.coordx = this.coordx;
    this.estacion.coordy = this.coordy;
    this.estacion.chip = '';
    this.estacion.orden = 0;
    this.estacion.nombreadministrador = this.form.value['nombreAdministrador'];
    this.estacion.apellidoadministrador = this.form.value['apellidoAdministrador'];
    this.estacion.dniadministrador = this.form.value['dniAdministrador'];
    this.estacion.telefonoadministrador = this.form.value['telefonoAdministrador'];
    this.estacion.correoadministrador = this.form.value['correoAdministrador'];
    this.estacion.estado = true;
    this.estacion.operadores = this.operadoresSeleccionados;
    console.log(this.estacion);
    if (this.estacion != null && this.estacion.id > 0) {
      let distritoSeleccionado = this.form.value['distrito'];
      this.distritoService
        .buscarPorId(distritoSeleccionado)
        .subscribe((data) => {
          this.estacion.distrito = data;
          if (this.selectedFiles != undefined) {
            console.log(this.estacion);
            this.estacionService
              .modificar(this.estacion)
              .pipe(
                concatMap((data) => {
                  return this.UploadFilesService.uploadPut(
                    this.selectedFiles[0],
                    Number(data)
                  );
                })
              )
              .pipe(
                concatMap(() => {
                  return this.estacionService.listar();
                })
              )
              .subscribe((data) => {
                this.estacionService.estacionCambio.next(data);
                this.estacionService.mensajeCambio.next('Se modifico');
                this.limpiarControles();
              });
          } else {
            this.estacionService
              .modificar(this.estacion)
              .pipe(
                concatMap((data)=>{
                  return this.UploadFilesService.crearDirectorio(Number(data));
                })
              )
              .pipe(
                concatMap(() => {
                  return this.estacionService.listar();
                })
              )
              .subscribe((data) => {
                this.estacionService.estacionCambio.next(data);
                this.estacionService.mensajeCambio.next('Se modifico');
                this.limpiarControles();
              });
          }
        });
    } else {
      let distritoSeleccionado = this.form.value['distrito'];
      this.distritoService
        .buscarPorId(distritoSeleccionado)
        .subscribe((data) => {
          this.estacion.id = null;
          this.estacion.nombre = this.form.value['nombre'];
          this.estacion.did = this.form.value['did'];
          this.estacion.direccion = this.form.value['direccion'];
          this.estacion.localidad = this.form.value['localidad'];
          this.estacion.coordx = this.coordx;
          this.estacion.coordy = this.coordy;
          this.estacion.chip = '';
          this.estacion.orden = 0;
          this.estacion.nombreadministrador = this.form.value['nombreAdministrador'];
          this.estacion.apellidoadministrador = this.form.value['apellidoAdministrador'];
          this.estacion.dniadministrador = this.form.value['dniAdministrador'];
          this.estacion.telefonoadministrador = this.form.value['telefonoAdministrador'];
          this.estacion.correoadministrador = this.form.value['correoAdministrador'];
          this.estacion.estado = true;
          this.estacion.distrito = data;
          this.estacion.operadores = this.operadoresSeleccionados;
          let estacionfiledto = new EstacionFileDto();
          console.log(this.estacion);
          if (this.selectedFiles != undefined) {
            estacionfiledto.estacion = this.estacion;
            estacionfiledto.file = this.selectedFiles;
            this.estacionService
              .registrar(this.estacion)
              .pipe(
                map((data) => {
                  return data;
                })
              )
              .pipe(
                map((data) => {
                  this.UploadFilesService.upload(
                    this.selectedFiles[0],
                    Number(data)
                  ).subscribe();
                })
              )
              .pipe(
                switchMap(() => {
                  return this.estacionService.listar();
                })
              )
              .subscribe((data) => {
                this.estacionService.estacionCambio.next(data);
                this.estacionService.mensajeCambio.next('Se registro');
                this.limpiarControles();
              });
          } else {
            estacionfiledto.estacion = this.estacion;
            estacionfiledto.file = this.selectedFiles;
            this.estacionService
              .registrar(this.estacion)
              .pipe(
                map((data) => {
                  return data;
                })
              ).pipe(
                concatMap((data)=>{
                  return this.UploadFilesService.crearDirectorio(Number(data));
                })
              )
              .pipe(
                switchMap(() => {
                  return this.estacionService.listar();
                })
              )
              .subscribe((data) => {
                this.estacionService.estacionCambio.next(data);
                this.estacionService.mensajeCambio.next('Se registro');
                this.limpiarControles();
              });
          }
        });
    }
    this.router.navigate(['estacion']);
  }

  selectFiles(event: any) {
    event.target.files.length == 1
      ? (this.fileName = event.target.files[0].name)
      : (this.fileName = event.target.files.length + ' archivos');
    this.selectedFiles = event.target.files;
  }

  agregarOperador() {
    if (this.operadoresSeleccionados.length > 2) {
      this.snackBar.open(
        'Aviso',
        'El Sistema solo permite hasta  3 operadores',
        {
          duration: 3000,
        }
      );
      return;
    }
    if (
      this.form.value['apellidoOperador'] == undefined ||
      this.dniOperador == undefined ||
      this.nombreOperador == undefined ||
      this.telefonoOperador == undefined
    ) {
      this.snackBar.open(
        'Aviso',
        'Debe ingresar todos los datos en el formulario del operador',
        {
          duration: 3000,
        }
      );
      return;
    }

    let operador = new Operador();
    operador.apellido = this.form.value['apellidoOperador'];
    operador.dni = this.form.value['dniOperador'];
    operador.nombre = this.form.value['nombreOperador'];
    operador.telefono = this.form.value['telefonoOperador'];
    this.operadoresSeleccionados.push(operador);
    this.dataSource = new MatTableDataSource(this.operadoresSeleccionados);
    this.nombreOperador = '';
    this.apellidoOperador = '';
    this.dniOperador = '';
    this.telefonoOperador = '';
  }

  removerOperador(dni: string) {
    this.operadoresSeleccionados = this.operadoresSeleccionados.filter(
      (item) => item.dni !== dni
    );
    this.dataSource = new MatTableDataSource(this.operadoresSeleccionados);
  }

  listarEstaciones() {
    this.router.navigate(['estacion']);
  }

  limpiarControles() {
    this.id = 0;
    this.nombre = '';
    this.did = '';
    this.departamentoSeleccionado = '';
    this.provinciaSeleccionada = '';
    this.distritoSeleccionado = '';
    this.direccion = '';
    this.localidad = '';
    this.nombreAdministrador = '';
    this.apellidoAdministrador = '';
    this.dniAdministrador = '';
    this.telefonoAdministrador = '';
    this.correoAdministrador = '';
    this.nombreOperador = '';
    this.apellidoOperador = '';
    this.dniOperador = '';
    this.telefonoOperador = '';
    this.correoOperador = '';
    this.estacion = null;
    this.operadoresSeleccionados = [];
    this.mensaje = '';
  }
}
