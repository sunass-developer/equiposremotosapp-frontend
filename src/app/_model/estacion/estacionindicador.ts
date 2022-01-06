export class EstacionIndicador{

    id : number;
    did : string;
    nombre : string;
    coordx : string;
    coordy : string;
    cloro : number;
    ph : number;
    temperatura : number;
    fecharegistro : string;

    constructor(id : number, did : string,nombre  : string, coordx : string, coordy : string, cloro:number,ph:number , temperatura : number, fecharegistro : string){
        this.id = id;
        this.did = did;
        this.nombre = nombre;
        this.coordx = coordx;
        this.coordy = coordy;
        this.cloro = cloro;
        this.ph = ph;
        this.temperatura = temperatura;
        this.fecharegistro = fecharegistro;
    }

}