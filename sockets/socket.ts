import { Socket } from "socket.io";
import { UsuariosLista } from "../class/lista.usuarios";
import { Usuario } from "../class/usuario";

export const usuariosConectados = new UsuariosLista;

export const conectarUsuario =(cliente: Socket, io:SocketIO.Server) =>{

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);

    

}




export const desconectar = ( cliente: Socket, io:SocketIO.Server) =>{

    cliente.on('disconnect', ()=>{
        
        usuariosConectados.borrarUsuario(cliente.id);

    })
    io.emit('usuarios-activos', usuariosConectados.getLista());

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
       
        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok:true,
            mensaje: payload.nombre

        });

    });

        
}

// obtener usuarios 
export const obtenerUsuarios =( cliente: Socket, io:SocketIO.Server)=>{

    cliente.on('obtener-usuario', () =>{
// solo mostramos la lista de conectados al usuario que se conecta, a los conectados ya no 
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());)

    }
}