const { verifyToken } = require("../utils/jwt");

function authenticateJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
        return res
            .status(401)
            .json({ success: false, message: "INVALID_TOKEN" });

    try {
        const otp = verifyToken(token, process.env.JWT_SECRET);
        res.otp = otp;
        next();
    } catch (error) {
        res.sendStatus(403);
    }
}

module.exports = authenticateJWT;
