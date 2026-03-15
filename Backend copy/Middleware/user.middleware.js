import { verifyToken } from "../Services/user.service.js"

export function checkCredentials(req,res,next){
    try{
    const result = req.headers.authorization
    if(!result){
           return res.status(400).json({message:"Token is  required",status:false}) 
    }
     const token = result.split(" ")[1]
    const decodedToken = verifyToken(token)
    req.user = decodedToken
    next();
}
catch(err){
   return res.status(401).json({
      message: "Invalid or expired token",
      status: false
    });
}
}