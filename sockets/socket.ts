import { Socket } from "socket.io";




export const desconectar = ( cliente: Socket ) =>{

    cliente.on('disconnect', ()=>{
        console.log('cliente desconectado ');
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