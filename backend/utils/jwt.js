const jwt = require("jsonwebtoken");

function generateToken(payload, secretKey, expiresIn = "365d") {
    return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
}

module.exports = {
    generateToken,
    verifyToken,
};
