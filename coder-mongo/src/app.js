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
//import passport y la funcion de passport
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';

//importo rutas
import { productsRouterAtlas } from './routes/productsDB.router.js';
import { cartRouterAtlas } from './routes/cartsDB.router.js';
import { messagesRouteAtlas } from './routes/messagesDB.router.js';
import { views } from './routes/viewsSession.route.js';
import { registerRoute } from './routes/register.route.js';
import { loginRoute } from './routes/login.route.js';
import { CurrentRouter } from './routes/current.route.js';
//variables de entonro
import config from './config/config.js';
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
            name:'coderCokieToken',
            mongoUrl:config.MONGO_URL,
            mongoOptions: {
                useNewUrlParser: true,
            },
            ttl: 6000, //esta en segundos
        }),
        //es una cadena usada para firmar la session,(es decir una cookie firmada)
        secret: 'B2zdY3B$pHmxW%',
        resave: false,
        saveUninitialized: false,
        cookie: {
            // Aquí puedes configurar otras opciones de la cookie, si es necesario
            // Por ejemplo, puedes agregar "secure: true" si estás utilizando HTTPS
            // y "httpOnly: true" para mejorar la seguridad
            // ...
            // name: 'coderCookieToken',  // No es necesario configurar el nombre aquí
        },
    })
);

//declaramos los middlewares
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/session', CurrentRouter)
//habilito la escucha del server
const webServer = server.listen('8080', () => { console.log('Levantando server') });
