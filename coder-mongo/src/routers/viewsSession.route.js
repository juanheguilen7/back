/* import { Router } from "express";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";

const viewsRoute = Router();

viewsRoute.get('/', isAuth, (req, res) => {
    const { user } = req.session;
    delete user.password;
    res.render('inde', {
        title: 'Perfil de Usuario',
        
    })

})
viewsRoute.get('/register', isGuest, (req, res) => {
    res.render('register', {
        title: 'Registro de Usuario',

    })
})
viewsRoute.get('/login', isGuest, (req, res) => {
    res.render('login', {
        title: 'Inicio de Session'
    })
})

export { viewsRoute } */