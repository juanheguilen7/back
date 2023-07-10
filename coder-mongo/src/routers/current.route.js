import { Router } from "express";
import passport from "passport";

const CurrentRouter = Router();


CurrentRouter.get('/current', passport.authenticate('current', { session: false }), async (req, res) => {
    res.json({ user: req.user })
})

export { CurrentRouter };