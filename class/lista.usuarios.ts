import { Usuario } from "./usuario";


export class UsuariosLista{

    private  lista  :Usuario []=[];

    constructor (){}

// vamos agregar un usuario a la lista de conectados asi que insertamos el usuario aal arreglo lista de tipo Usuario
    public agregar(usuario:Usuario){

        this.lista.push( usuario );

        console.log(this.lista );

        return usuario;
    }
/* vamos actualizar el nombre del usuario necesitamos su id y su nombre eso los obtenemos del arreglo de lista 
   y comparamos el id que esta en usuario.id con el id que recibimos como argumento si coinciden entonces 
  asignamos el nombre que tenemos en usuario.nombre a nombre del argumento*/

public actualizarNombre(id: string, nombre:string){

    for(let usuario of this.lista){
        
        if( id === usuario.id){
            usuario.nombre = nombre
            break;
        }
    }

    console.log('====== Actualizando Nombre =====');
    console.log(this.lista);

}
/* ahora vamos a obtener la lista de usuarios conectados */
public getLista(){
    return this.lista;

}
// obtener un usuario 
public getUsuarios( id: string){

    return this.lista.find(usuario =>{
        return usuario.id === id
    });

}
// obtener un usuario en una sala en particular
public getUsuarioEnSala(sala: string){

    return this.lista.filter( usuario =>{
        return usuario.sala ===sala
    });

}
// borrar usuario, esto es cuando un usuario se desconecta del chat 
borrarUsuario(id: string){

    const usuariotemp = this.getUsuarios(id);

    this.lista = this.lista.filter( usuario =>{
        return usuario.id !== id;
    });
    return usuariotemp;

}



}