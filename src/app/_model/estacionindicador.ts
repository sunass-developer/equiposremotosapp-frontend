export class EstacionIndicador{

    id : number;
    did : string;
    nombre : string;
    coordx : string;
    coordy : string;
    cloro : number;
    ph : number;
    temperatura : number;
    caudal : number;
    corrientedc: number;
    corrienteac : number;
    fecharegistro : string;
    fecharegistrocorriente : string;
    idestacion : number;

    constructor(id : number, did : string,nombre  : string, coordx : string, coordy : string, cloro:number,ph:number , temperatura : number, caudal:number, corrientedc:number,corrienteac:number, fecharegistro : string, fecharegistrocorriente:string, idestacion : number ){
        this.id = id;
        this.did = did;
        this.nombre = nombre;
        this.coordx = coordx;
        this.coordy = coordy;
        this.cloro = cloro;
        this.ph = ph;
        this.temperatura = temperatura;
        this.caudal = caudal;
        this.corrientedc = corrientedc;
        this.corrienteac = corrienteac;
        this.fecharegistro = fecharegistro;
        this.fecharegistrocorriente = fecharegistrocorriente;
        this.idestacion  = idestacion;
    }

}