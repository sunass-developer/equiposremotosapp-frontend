export class EstacionDao { 

    did : string;
    nombre: string;
    cloro:number;
    ph: number;
    temperatura : number;
  
    constructor(nombre: string, cloro: number, ph: number, temperatura:number){
      this.nombre = nombre;
      this.cloro = cloro;
      this.ph = ph;
      this.temperatura = temperatura;
    }  
  }
  