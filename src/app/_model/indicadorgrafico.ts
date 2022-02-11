export class IndicadorGrafico{
    cloro: number;
    ph: number;
    temperatura : number;
    fecharegistro : string;
    estacion : string;

    constructor(cloro: number, ph: number,temperatura:number,fecharegistro:string, estacion : string){
        this.cloro = cloro;
        this.ph = ph;
        this.temperatura = temperatura;
        this.fecharegistro = fecharegistro;
        this.estacion = estacion;
    }    
}