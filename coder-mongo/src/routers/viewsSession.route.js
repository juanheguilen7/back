import { Router } from "express";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";


const views = Router();

views.get('/', isGuest, (req, res) => {
    res.render('login', {
        title: 'Ingresar Session'
    })
})

views.get('/api/profile', isAuth, (req, res) => {
    //recibo el usuario conectado
    const { user } = req.session.user;
    //le elimino la password y paso dato para renderizar
    delete user.password
    res.render('index', {
        title: 'Perfil',
        user,
    })
})

views.get('/api/register', isGuest, (req, res) => {
    res.render('register', {
        title: 'Registrarse'
    })
})

export { views };