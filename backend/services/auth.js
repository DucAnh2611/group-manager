const { generateToken } = require("../utils/jwt");

const authByOTP = async (body) => {
    const { otp } = body;
    const otpPass = parseInt(process.env.OTP_PASS);

    if (parseInt(otp) === otpPass) {
        const token = await generateToken({ otp }, process.env.JWT_SECRET);
        return {
            success: true,
            data: {
                token: token,
            },
        };
    }
    return {
        success: false,
    };
};

module.exports = { authByOTP };
