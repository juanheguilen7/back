//de este lado manejo passport que es generador de estrategia de autenticacion y autorizacion, y tambien el manejo del hasheo
import passport from "passport";
import local from 'passport-local';
//jwt
import jwt_strategy from 'passport-jwt';
import jwt from 'jsonwebtoken'
import sessionService from "../dao/service/session.service.js";
import { createHash, validPassword } from "../../utils.js";
import cartService from "../dao/service/carts.service.js";
//variables de entorno
import config from './config.js'

//github
import GitHubStrategy from "passport-github2";

//constantes github
const GITHUB_CLIENT_ID = 'Iv1.234b8c89cf5e9ae2';
const GITHUB_CLIENT_SECRET = '8f76f12de5f207ad93f977d1931f190cb901eb3d';
const CALLBACK_URL = 'http://localhost:8080/api/login/githubcb';


const LocalStrategy = local.Strategy
const JWTStrategy = jwt_strategy.Strategy; //core de la estrategia
const ExtractJWT = jwt_strategy.ExtractJwt; //extractor de jwt
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};


export const initializePassport = () => {
    //ESTRATEGIA DE REGISTRO LOCAL
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //recibo los datos del body
            const { first_name, last_name, email, age } = req.body;
            try {
                //para que no se cree usuario con el mail de coder
                if (email === config.ADMIN_EMAIL) {
                    return done(null, false, { message: 'Correo electronico no valido' })
                }
                //verifico que no exista ese usuario
                let user = await sessionService.getUserByEmail(username);
                if (user) {
                    //si existe, envio un null que no hay errr, pero el usuario no esta disponible
                    return done(null, false, { message: 'the user is not available' });
                }
                //creo el cart nuevo
                let newCart = await cartService.createCart();
                //si no existe creo el nuevo usuario con su hasheo
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cartID: newCart._id, //inserto el id del cart creado, asociado a ese user
                    role: 'user'
                }
                //creo el usuario
                let result = await sessionService.createUser(newUser)

                //respondo que no hay error, y el resultdo
                return done(null, result);
            } catch (err) {
                return done(`Error creating user ${err}`);
            }
        }
    ))

    //serializar y deserializar usuario
    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        if (id === "coder") {
            return done(null, false);
        } else {
            let user = await sessionService.getUserById(id);
            if (!user) return done(null, false, { message: 'User not found' })
            return done(null, user);
        }
    })
    //ESTRATEGIA DE LOGIN LOCAL
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            if (username === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
                //creo la session con esos datos y redirijo a products
                const user = {
                    email: username,
                    role: "Admin",
                    _id: "coder"
                };
                return done(null, user);
            }
            const user = await sessionService.getUserByEmail(username);
            //verifico que el usuario exista
            if (!user) {
                //si no existe envio message
                return done(null, false, { message: 'User doesn`t exist' })
            }
            //verifico que la passwrod, coresponda con el user //con el compare(del hash)
            if (!validPassword(user, password)) return done(null, false, { message: "the password not is valid" });
            //en caso de que se cumplan ambas, respondo que no hay erro, y envio el user
            return done(null, user);
        } catch (err) {
            return done(`Error user not found ${err}`)
        }
    }))
    //estrategia de JSONWebToken 
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),//extraigo de cookies y este valor lo deserializa
        secretOrKey: 'B2zdY3B$pHmxW%', //corrobora que sea el mismo secret que en app.js

    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (err) {
            return done(err);
        }
    }))


    //ENTRA LA ESTRATEGIA DE GITHUB, QUE RECIBE UN {} CON DATOS DE MI APP Y UNA CB CON DATOS DEL USER
    passport.use('github', new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await sessionService.getUserByEmail(profile._json.email);
            //si el usuario no existe
            if (!user) {
                let newCart = await cartService.createCart();
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "Logueado desde Git",// datos q no vienen con github
                    age: 1,//datos q no vienen con github
                    email: profile._json.email,
                    password: '',
                    cartID: newCart._id, //inserto el id del cart creado, asociado a ese user
                    role: 'user' //con autenticacion de terceros no se tiene password
                }
                //creo el usuario en la dataBase
                let result = await sessionService.createUser(newUser)
                done(null, result)
            } else {
                //el usuario ya existe
                done(null, user)
            }

        } catch (err) {
            return done(err);
        }
    }))

}


