
export class FiltroReporte {
    idEstacion : number;
    fechaInicioConsulta : Date;
    fechaFinConsulta : Date;

    constructor (idEstacion : number, fechaInicioConsulta : Date, fechaFinConsulta:Date){
        this.idEstacion = idEstacion;
        this.fechaInicioConsulta = fechaInicioConsulta;
        this.fechaFinConsulta = fechaFinConsulta;
    }
}