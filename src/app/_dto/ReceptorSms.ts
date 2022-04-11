
import { Estacion } from './../_model/estacion';

export class ReceptorSms {

    id : number;
    nombre : string;
    apellido : string;
    cargo : string;
    entidad : string;
    dni : string;
    celular : string;
    contrasenia : string;
    correo : string;
    estacion : Estacion;
    estado : boolean;

}