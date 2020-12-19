import { Socket } from "socket.io";
import { UsuariosLista } from "../class/lista.usuarios";
import { Usuario } from "../class/usuario";

export const usuariosConectados = new UsuariosLista;

export const conectarUsuario =(cliente: Socket) =>{

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);

}




export const desconectar = ( cliente: Socket ) =>{

    cliente.on('disconnect', ()=>{
        
        usuariosConectados.borrarUsuario(cliente.id);
    })

}

export const mensajes = (cliente: Socket , io:SocketIO.Server)=>{

    cliente.on('mensaje',( payload: { de: string , cuerpo:string}) =>{
        
        console.log('mensaje recibido', payload);
 /* io es nuestro servidor de socket asi que el sabe cuando se conecta un nuevo cliente
    asi que aqui escuchamos un nuevo mensaje osea un nuevo cliente conectado a nuestro servidor */  
        io.emit('nuevo-mensaje',payload)
        
    });

}


export const configurarUsuario =( cliente: Socket, io:SocketIO.Server)=>{

    cliente.on('configuracion', (payload: {nombre: string}, callback: Function) =>{

        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);

        callback({
            ok:true,
            mensaje: payload.nombre

        });

    });

        
}