const crypto = require("crypto");

function encrypt(text, privateKey) {
    const cipher = crypto.createCipher("aes-256-cbc", privateKey);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(encryptedText, privateKey) {
    const decipher = crypto.createDecipher("aes-256-cbc", privateKey);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { decrypt, encrypt };
