import { Router } from "express";
import passport from "passport";

const registerRoute = Router();

//recibo los datos del usuario, uso el middleware para authenticar, y lo redirijo a el login
registerRoute.post('/', passport.authenticate('register', { failureRedirect: '/api/register' }), async (req, res) => {
    res.status(200).redirect('/')
})

export { registerRoute };