import { Distrito } from './distrito';
import { Operador } from './operador';

export class Estacion { 
  id : number;
  did : string;
  nombre: string;
  coordx : string;
  coordy : string;
  chip : string;
  orden : number;
  direccion : string;
  nombreadministrador : string;
  apellidoadministrador : string;
  dniadministrador : string;
  telefonoadministrador : string;
  correoadministrador : string;
  estado  : boolean;
  distrito : Distrito;
  operadores : Operador[];

}