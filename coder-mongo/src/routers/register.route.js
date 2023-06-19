import { Router } from "express";
import sessionService from "../dao/service/session.service.js";

const registerRoute = Router();

//recibo los datos del usuario y los cargo a mi DB
registerRoute.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const email = await sessionService.getByEmail(newUser.email);

        if (email !== newUser.email) {
            //creo el usuario
            const create = await sessionService.createUser(newUser);
            //redirijo a el login
            res.redirect('/')
        }else(
            res.redirect('/api/register')
        )


    } catch (err) {
        res.status(500).send({ err });

    }
})

export { registerRoute };