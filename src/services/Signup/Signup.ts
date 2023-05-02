import { client } from "../../Database/db";
import bcrypt from 'bcryptjs';
import { FastifyReply, FastifyRequest } from "fastify";
import { validEmail, validPassword } from "../../validation";


export const signUp = async (req:FastifyRequest,res:FastifyReply) => {
  const createUser = 'INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)'

  try{
    const {name,email,password}:userReqBody = req.body as userReqBody
    const hashedPassword = await bcrypt.hash(password, 10);

   if(!validEmail) {
    res.send('email not valid')
   }
   if(!validPassword) {  
    res.send('password must be at least 8 characters') 
   }

   client.query(createUser,[name,email,hashedPassword])

   res.send(`user '${name}' created!`)
  }catch(err) {
    console.log(err)
    res.status(500).send('internal server error')
  } 
}