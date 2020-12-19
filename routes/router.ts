import {Router, Request, Response } from 'express';
import Server from '../class/server';





export  const router = Router();

router.get('/mensaje', ( req: Request, res: Response) =>{

    res.json({
        ok:true,
        mensaje: 'todo esta bien'
    });

});

// servicio REST para mandar mensajes en general a toda persona que este conectada als servicio de socket

router.post('/mensaje', ( req: Request, res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload ={ de, cuerpo}

    const server = Server.instance;

    server.io.emit( 'nuevo-mensaje', payload);

    res.json({
        ok:true,
       cuerpo,
       de
    });

});

// servicio REST para mandar mensajes privados 

router.post('/mensaje/:id', ( req: Request, res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload={
        de,
        cuerpo

    }
    // hacemos una instancia de el servicio de socket que tenemos en el server y luego lo utilizamos y hacemos un emit
    const server = Server.instance;

// configuramos el tipo de mensaje que vamos a mandar aqui son mensajes privados igual la llave y el payload(cuerpo)
    server.io.in(id).emit('mensaje-privado',payload)

    res.json({
        ok:true,
       cuerpo,
       de,
       id
    });

});