const { Router } = require("express");
const { authByOTP } = require("../services/auth");

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
    const body = req.body;

    const loginInf = await authByOTP(body);

    if (loginInf.success) {
        return res.status(200).json(loginInf);
    }
    return res.status(400).json(loginInf);
});

module.exports = AuthRouter;
