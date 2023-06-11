//importo dependencias
import express from 'express';
import handlebars from "express-handlebars"
import __dirname from '../utils.js';
import mongoose from 'mongoose'
import { server, app } from '../utils.js';

//importo rutas
import { productsRouterAtlas } from './routers/productsDB.router.js';
import { cartRouterAtlas } from './routers/cartsDB.router.js';
import { messagesRouteAtlas } from './routers/messagesDB.router.js';

//parseo a json
app.use(express.json())
//permite recibir datos complejos desde las url
app.use(express.urlencoded({ extended: true }));

//seteo el directorio de archivos estatico;
app.use(express.static(__dirname + '/public'));

// Set handlebars- a ese nombre es ese gestor
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
//a mis views las procesas con esto
app.set('view engine', 'handlebars');

//uso de rutas
app.use('/api/products', productsRouterAtlas);
app.use('/api/carts', cartRouterAtlas);
app.use('/api/chat', messagesRouteAtlas);


//conectando a Atlas
const environment = async () => {

    await mongoose.connect('mongodb+srv://juanheguilen:Cinqsauvages1234@cluster0.jljrb4e.mongodb.net/?retryWrites=true&w=majority');
}

environment();

//habilito la escucha del server
const webServer = server.listen('8080', () => { console.log('Levantando server') });
