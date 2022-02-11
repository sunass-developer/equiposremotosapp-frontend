export class Estacion { 

    id : number;
    did : string;
    nombre: string;
    coordx : string;
    coordy : string;
    chip : string;
  
    constructor(id : number, did:string, nombre:string, coordx:string,coordy:string,chip:string){
      this.id = id;
      this.did = did;
      this.nombre = nombre;
      this.coordx = coordx;
      this.coordy = coordy;
      this.chip = chip;
    }  
  }
  