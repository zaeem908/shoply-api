import { client } from "./db";
import bcrypt from 'bcryptjs';
import { createSubject, findEmail } from "./queries";
import jwt from 'jsonwebtoken';
import { getUserByEmail } from "./queries";
import { createToken, validEmail, validPassword } from "./validation";
import {mail} from "./mail";

export const login = async (req:any,res:any) => {
   try{
    const {email,password} = req.body
    const result = await client.query(getUserByEmail,[email]);
    const user = result.rows[0]
      if(!validEmail(email)) {
         res.status(400).send('email not valid')
      }
      if(!validPassword(password)) {
         res.status(400).send('password must be at least 8 characters')
      }
      if(!user) {
        res.send('no user with this email')
      }
         if(user) {
         const passwordMatch = await bcrypt.compare(password,user.password) 
         if(passwordMatch) {
         const token = createToken(email)
          res.send("login succesful")
          console.log(token) 
        }else{
         res.status(400).send('password not matched')
        }
       }
    } 
       catch(err) {
        res.status(500).send('internal server error')
       }
 }

 
 export const forgotPassword = async (req:any,res:any) => {
  try{
    const {email} = req.body
    const data = await client.query(findEmail,[email])
    const user = data.rows[0]

    if(!validEmail(email)) {
      res.status(400).send('email not valid!')
    }

    if(user.email == email) {
        console.log(mail)
        res.send('email sent succesfully')
    //   sgMail.send(mail)
    //   .then(() => {
    //     console.log('email sent succesfully')
    //     response.status(200).send('email sent succesfully')
    //   }) 
    }
    
  }catch(err){
    console.log(err)
    res.status(500).send('no such email in database')
  } 
  }; 

  
 export const addSubject = async (req:any,res:any) => {
    try{
      const {token,subject} = req.body
      const verified = jwt.verify(token,'secretpassword')
      if(verified) {
        client.query(createSubject,[subject])
        res.send(`${subject} added to subjects`)
      }
      if(!verified) {
        res.send('user not logged in!')
      }

    }catch(err) {
      console.log(err)
      res.status(500).send('internal sever error')
    }
  }
