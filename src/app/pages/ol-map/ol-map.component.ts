import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import Projection from 'ol/proj/Projection';
import proj4 from 'proj4';
import { fromLonLat, toLonLat } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { FullScreen, defaults as defaultControls } from 'ol/control';
import { EstacionService } from './../../_service/estacion.service';
import Overlay from 'ol/Overlay';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { concatMap } from 'rxjs/operators';
import { LoginService } from './../../_service/login.service';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css'],
})
export class OlMapComponent implements OnInit {
  map: Map;
  projection: Projection;
  view: View;
  features = new Array();
  isOpen = false;
  @ViewChild('popup') popup: ElementRef;
  overlay: Overlay;
  contenidoPopupContent: SafeHtml;

  constructor(
    private es: EstacionService,
    private sanitized: DomSanitizer,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    proj4.defs(
      'EPSG:3857',
      '+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs'
    );
    register(proj4);

    this.es.listarPopup().subscribe((datos) => {

      if(this.loginService.estaLogeado()){
        datos.forEach((objeto) => {
          this.features.push(
            new Feature({
              id : objeto.id,
              geometry: new Point([Number(objeto.coordx), Number(objeto.coordy)]),
              name: objeto.nombre,
              did: objeto.did,
              chip: objeto.chip,
              departamento: objeto.distrito.provincia.departamento.nombre,
              provincia: objeto.distrito.provincia.nombre,
              distrito: objeto.distrito.nombre,
              direccion: objeto.direccion,
              nombreAdministrador : objeto.nombreadministrador,
              apellidoAdministrador : objeto.apellidoadministrador,
              dniAdministrador : objeto.dniadministrador,
              celularAdministrador : objeto.telefonoadministrador,
              correoAdministrador : objeto.correoadministrador
            })
          );
        });
      }
      else{
        datos.forEach((objeto) => {
          this.features.push(
            new Feature({
              id : objeto.id,
              geometry: new Point([Number(objeto.coordx), Number(objeto.coordy)]),
              name: objeto.nombre,
              /*did: objeto.did,
              chip: objeto.chip,*/
              departamento: objeto.distrito.provincia.departamento.nombre,
              provincia: objeto.distrito.provincia.nombre,
              distrito: objeto.distrito.nombre/*,
              direccion: objeto.direccion*/
            })
          );
        });
      }

      this.overlay = new Overlay({
        element: this.popup.nativeElement,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });
      this.features.forEach((f) => {
        f.setStyle(
          new Style({
            image: new Icon({
              src: 'assets/img/marcador-estacion-celeste.png',
            }),
            text: new Text({
              text: f.values_.name,
              fill: new Fill({
                color: 'black',
              }),
              stroke: new Stroke({ color: 'white', width: 2.0 }),
              font: 'bold 13px serif',
              offsetX: 0,
              offsetY: -15,
            }),
          })
        );
      });
      const source = new VectorSource({
        features: this.features,
      });
      const vectorLayer = new VectorLayer({
        source: source,
      });
      this.view = new View({
        projection: 'EPSG:3857',
        zoom: 6.5,
        center: fromLonLat([-75.6480952, -9.195992], 'EPSG:3857'),
      });
      this.map = new Map({
        view: this.view,
        controls: defaultControls().extend([new FullScreen()]),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        overlays: [this.overlay],
        target: 'ol-map',
      });
      this.map.on('click', (evt) => {
        const feature = this.map.forEachFeatureAtPixel(
          evt.pixel,
          function (feature) {
            return feature;
          }
        );
        if (feature) {
          if(this.loginService.estaLogeado()){
            this.overlay.setPosition(evt.coordinate);
            this.contenidoPopupContent = this.sanitized.bypassSecurityTrustHtml(
              `<strong>` +
                `Datos de Estación` +
                `</strong>` +
                `<br>Did : ` +
                feature.get('did') +
                `<br>Nombre : ` +
                feature.get('name') +
                `<br>Chip : ` +
                feature.get('chip') +
                `<br>Departamento : ` +
                feature.get('departamento') +
                `<br>Provincia : ` +
                feature.get('provincia') +
                `<br>Distrito : ` +
                feature.get('distrito') +
                `<br>Dirección : ` +
                feature.get('direccion') +
                `<hr><strong>` +
                `Datos del Administrador` +
                `</strong>` +
                `<br>Nombre : ` +
                feature.get('nombreAdministrador') +
                `<br>Apellido : ` +
                feature.get('apellidoAdministrador') +
                `<br>DNI : ` +
                feature.get('dniAdministrador') +
                `<br>Celular : ` +
                feature.get('celularAdministrador') +
                `<br>Correo : ` +
                feature.get('correoAdministrador') +
                `<br>`/*+
                `<a Target="_blank" href="fichadescriptiva/`+feature.get('id')+`">descargar ficha descriptiva</a>`*/
                //`<button type="button" onclick="openWindow()">google</button>`
            );
          } else { 
            this.overlay.setPosition(evt.coordinate);
            this.contenidoPopupContent = this.sanitized.bypassSecurityTrustHtml(
              `<strong>` +
                `Datos de Estación` +
                `</strong>` +
                `<br>Nombre : ` +
                feature.get('name') +
                `<br>Departamento : ` +
                feature.get('departamento') +
                `<br>Provincia : ` +
                feature.get('provincia') +
                `<br>Distrito : ` +
                feature.get('distrito') +
                `<br>`/*+
                `<a Target="_blank" href="#/inicio/fichadescriptiva/`+feature.get('id')+`">descargar ficha descriptiva</a>`*/
            );
          }          
        } else {
          this.overlay.setPosition(undefined);
          this.contenidoPopupContent = '';
        }
      });
      this.map.on('pointermove', (e) => {
        const pixel = this.map.getEventPixel(e.originalEvent);
        const hit = this.map.hasFeatureAtPixel(pixel);
        this.map.getViewport().style.cursor = hit ? 'pointer' : '';
      });
    });
  }

  /*openWindow() {
    alert('hello');
  }*/

  cerrarPopup() {
    this.overlay.setPosition(undefined);
    document.getElementById('popup-closer')?.blur();
    return false;
  }
}
