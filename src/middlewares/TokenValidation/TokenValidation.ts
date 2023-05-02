import { FastifyReply, FastifyRequest } from "fastify"
import  jwt  from "jsonwebtoken"



export const TokenValidation = (req:FastifyRequest,res:FastifyReply,next:any ) => {
     const {token}:reqBody = req.body as reqBody
     const verified = jwt.verify(token,'secretpassword')
     if(!verified) {
        res.send('user not verified')
     }
     if(verified) {
        next()
     }

}
