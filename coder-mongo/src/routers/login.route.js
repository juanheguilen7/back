import { Router } from "express";
import sessionService from "../dao/service/session.service.js";

const loginRoute = Router();

loginRoute.post('/', async (req, res) => {
    const { email, password } = req.body
    //si el email es el de coder al igual q la contraseña
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        //creo la session con esos datos y redirijo a products
        const user = {
            email,
            password,
            rol: 'Admin'
        };
        req.session.user = user
        return res.redirect('/api/products')
    }
    //si no es eso hago la llamada a los usuarios y verifico si existen y si existen dejo paso sino los mando a registrarse
    try {
        const user = await sessionService.getByEmail(email);
        if (!user) throw new Error('Invalid Data');
        if (user.password !== password) throw new Error('Invalid Data')
        //si todo esta bien guardo el usuario en la session
        req.session.user = user;
        res.redirect('/api/products');

    } catch (err) {
        //si no tengo usuario cargado mando a registrarse
        res.redirect('/api/register')
    }
})

loginRoute.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

export { loginRoute };