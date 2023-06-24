//de este lado manejo passport que es generador de estrategia de autenticacion y autorizacion, y tambien el manejo del hasheo
import passport from "passport";
import local from 'passport-local';
import sessionService from "../dao/service/session.service.js";
import { createHash, validPassword } from "../../utils.js";

const LocalStrategy = local.Strategy

export const initializePassport = () => {

    //estrategia para register
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //recibo los datos del body
            const { first_name, last_name, email, age } = req.body;

            try {
                //para que no se cree usuario con el mail de coder
                if (email === "adminCoder@coder.com") {
                    return done(null, false, { message: 'Correo electronico no valido' })
                }

                //verifico que no exista ese usuario
                let user = await sessionService.getByEmail(username);

                if (user) {
                    //si existe, envio un null que no hay errr, pero el usuario no esta disponible
                    return done(null, false, { message: 'the user is not available' });
                }

                //si no existe creo el nuevo usuario con su hasheo
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
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
        console.log(user);
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        if (id === "coder") {
            return done(null, false);

        } else {
            console.log(id);
            let user = await sessionService.getByid(id);
            if (!user) return done(null, false, { message: 'User not found' })
            return done(null, user);

        }

    })

    //creacion de estrategia para login
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {

            if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                //creo la session con esos datos y redirijo a products
                const user = {
                    email: username,
                    rol: "Admin",
                    _id: "coder"
                };

                return done(null, user);
            }

            const user = await sessionService.getByEmail(username);
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
}



