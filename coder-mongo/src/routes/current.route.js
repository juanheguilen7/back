import { Router } from "express";
import passport from "passport";
import { authToken } from "../middleware/auth.middleware.js";

const CurrentRouter = Router();


CurrentRouter.get('/current', authToken, passport.authenticate('current', { session: false }), async (req, res) => {
    
    res.json({ user: req.user })
})

export { CurrentRouter };