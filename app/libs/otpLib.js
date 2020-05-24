const speakeasy   = require('speakeasy');

let generateSecret = () => {
    const secret  = speakeasy.generateSecret({length:20});
    return secret.base32;
}

let generateOtp = (secret) => {
    const otp = speakeasy.totp({
        secret   : secret,
        encoding : "base32"
    })
    return otp;
}

let verifyOtp = (token,secret) => {
    const valid = speakeasy.totp.verify({
        secret      : secret,
        encoding    : "base32",
        token       : token,
        window      : 1
    })
    return valid;
}

module.exports ={
    generateSecret,
    generateOtp,
    verifyOtp
}


