import jwt from "jsonwebtoken"
export function createToken(user){
   return  jwt.sign({email:user.email},process.env.secret_key)
}
export function verifyToken(token){
    return jwt.verify(token,process.env.secret_key)
}