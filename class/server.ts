import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';



export default class Server{

    private static _instance: Server;

    public app: express.Application;
    public port: number ;
    public io: socketIO.Server;
    private httpServer :http.Server;


    constructor(){

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app)
       /* esta configuracion es para la version de sockets.io 3.0.3 
       this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
        */
       this.io = new socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this() );
    }

    escucharSockets(){
        console.log('escuchando- sockets');

        // socket nos genera el id del socket en cliente.id y no del cliente ni del usuario 
        this.io.on('connection', cliente =>{

            //conectar cliente

            socket.conectarUsuario(cliente, this.io)
              
    
              //login
               socket.configurarUsuario(cliente, this.io);

               //obtener usuarios activos
               socket.obtenerUsuarios(cliente, this.io);

               //escucahr Mensajes

               socket.mensajes(cliente, this.io);

               //desconectar

               socket.desconectar( cliente, this.io );


            


            
        });

    }

    start(callback: () => void ) {
        this.httpServer.listen(this.port, callback)
    }


}