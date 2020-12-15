import Server from "./class/server";
import { router } from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';


const server = new Server ();


// body-Parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() ); 

// configuracion Cors
server.app.use( cors( { origin: true, credentials: true} ) );

// rutas 
server.app.use('/', router);








server.start( () => {
    console.log(`el servidor esta corriendo en el puerto ${server.port}`);
})