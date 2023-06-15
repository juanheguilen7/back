import { Router } from "express";
import userService from "../dao/service/user.service.js";

const userRoute = Router();

userRoute.post('/', async (req, res) => {
    const userData = req.body;

    try {

        const newUser = await userService.createUser(userData);
        //puedo hacer redirect
        res.status(201).json(newUser);

    } catch (err) {

        res.status(400).json({ err: err.message });
    }

})

userRoute.post('/auth', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userService.getByEmail(email);

        if (!user) throw new Error('Invalid Data');
        if (user.password !== password) throw new Error('Invalid Data');
        req.session.user = user; //crea session de usuario si no sale error
        //puedo ahcer redirect
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

userRoute.post('/logout', (req, res) => {
    req.session.destroy();
    req.status(200).json({ message: 'Logged Out' });
})

export { userRoute }