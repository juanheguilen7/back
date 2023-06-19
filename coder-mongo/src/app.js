//importo dependencias
import express from 'express';
import handlebars from "express-handlebars"
import __dirname from '../utils.js';
import mongoose from 'mongoose'
import { server, app } from '../utils.js';

//session y cookie
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';


//importo rutas
import { productsRouterAtlas } from './routers/productsDB.router.js';
import { cartRouterAtlas } from './routers/cartsDB.router.js';
import { messagesRouteAtlas } from './routers/messagesDB.router.js';
import { views } from './routers/viewsSession.route.js';
import { registerRoute } from './routers/register.route.js';
import { loginRoute } from './routers/login.route.js';

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



//uso de cookies
app.use(cookieParser('B2zdY3B$pHmxW%'));
// Session
app.use(
    session({
        //store define la configuracion de almacenamiento para las sessiones. uso mongoStore
        store: MongoStore.create({
            mongoUrl:
                'mongodb+srv://juanheguilen:Cinqsauvages1234@cluster0.jljrb4e.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: {
                useNewUrlParser: true,
            },
            ttl: 6000,//esta en segundos
        }),
        //es una cadena usada para firmar la session,(es decir una cookie firmada)
        secret: 'B2zdY3B$pHmxW%',
        resave: false,
        saveUninitialized: false,
    })
);

//conectando a Atlas
const environment = async () => {

    await mongoose.connect('mongodb+srv://juanheguilen:Cinqsauvages1234@cluster0.jljrb4e.mongodb.net/?retryWrites=true&w=majority');
}
environment();


//uso de rutas
app.use('/api/products', productsRouterAtlas);
app.use('/api/carts', cartRouterAtlas);
app.use('/api/chat', messagesRouteAtlas);
app.use('/', views);
app.use('/api/register', registerRoute)
app.use('/api/login', loginRoute)
//habilito la escucha del server
const webServer = server.listen('8080', () => { console.log('Levantando server') });
