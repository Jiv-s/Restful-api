import crypto from "crypto"
import jwt from "jsonwebtoken"

const generateResetToken = () => {          // this will generate ramdom charcaters which are derived from crypto
    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken  = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex")

    return {rawToken,hashedToken}
}

const generateAceessToken = (payload)=>{
    return jwt.sign(payload,prosess.env.JWT_ACCESS_SECRATE,{
        expiresIn: process.env.JWT_ACCESS_EXPRIES_IN || '15m'
    })
}
const verifyAcessToken = (token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_SECRATE)
}

const generateRefreshToken = (payload) => {
    jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{
        expiresIn: process.env.JWT_REFRESH_EXPRIES_IN|| '7d'
    })
}

const verifyRefreshToken = (token)=>{
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}

export {
    generateResetToken,
    generateAceessToken,
    generateRefreshToken,
    verifyAcessToken,
    verifyRefreshToken,
}