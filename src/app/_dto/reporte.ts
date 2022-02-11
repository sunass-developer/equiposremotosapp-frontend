export class Reporte{

    nombre : string;
    fecharegistro : Date;
    cloro : number;
    ph : number;
    temperatura : number;

    public Reporte(nombre : string, fecharegistro: Date, cloro:number, ph:number,temperatura:number){
        this.nombre = nombre;
        this.fecharegistro = fecharegistro;
        this.cloro = cloro;
        this.ph = cloro;
        this.temperatura = temperatura;
    }

}