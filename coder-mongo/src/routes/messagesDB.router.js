import { Router } from "express";
import messagesService from '../dao/service/messages.service.js'
import { io } from "../../utils.js";

const messagesRouteAtlas = Router();

let usuario = {
    user: '',
    email: '',
    message: []
}

messagesRouteAtlas.get('/', (req, res) => {
    res.render('chat')
})


io.on('connection', async (socket) => {
    //recibo el email del cliente
    socket.on('email', (email) => {
        //lo agrego a mi objeto
        usuario.email = email;
    })
    //recibo el alias del cliente
    socket.on('user', async (user) => {
        //lo agrego al objeto
        usuario.user = user;
        //tengo el mail y el alias, creo un doc usuario con eso y un array vacio del message
        let agregarDB = await messagesService.createModelUser(usuario);

    })

    //recibo el mensaje y el mail de quien mando el mensaje
    socket.on('message', async (dato) => {
        //envio datos para que guarde
        await messagesService.saveMsj(dato);
        //lo emito al cliente para que lo dibuje
        io.emit('messages', await messagesService.getMessages())
    })

})


export { messagesRouteAtlas };