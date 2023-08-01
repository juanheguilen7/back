import { Router } from "express";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";


const views = Router();
views.get('/', isAuth, (req, res) => {
    res.render('login', {
        title: 'Ingresar Session'
    })
})

//si no existe una session del usuario lo dejo seguir si existe lo mando a verificarse
views.get('/api/register',isAuth, (req, res) => {
    res.render('register', {
        title: 'Registrarse'
    })
})

export { views };