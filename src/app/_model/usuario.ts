
import { Rol } from './rol';

export class Usuario {

    idUsuario : number;
    username : string;
    nombre : string;
    apellido : string;
    cargo  : string;
    password : string;
    enabled : boolean;
    roles : Rol[];
}