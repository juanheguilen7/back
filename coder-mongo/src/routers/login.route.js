import { Router } from "express";
import passport from "passport";

const loginRoute = Router();

loginRoute.post('/', passport.authenticate('login', { failureRedirect: '/api/register' }), async (req, res) => {

    
    if (!req.user) return res.status(400).send({ status: "err", error: "invalid Credentials" });
    if (req.user.email === "adminCoder@coder.com") {
        req.session.user = {
            first_name: "CODER",
            last_name: "ADMINISTRADOR",
            email: req.user.email,
            rol: "Admin"
        }
    } else {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            rol: "User"
        }
    }
    console.log(req.session.user)
    res.redirect('/api/products')

})

loginRoute.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

export { loginRoute };
