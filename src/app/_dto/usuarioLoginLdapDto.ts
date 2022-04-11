
export class UsuarioLoginLdapDto {

    usuario : string;
    contrasenia : string;

    constructor(usuario : string, contrasenia : string){
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }

}