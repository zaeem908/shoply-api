import { client } from "./db";
import bcrypt from 'bcryptjs';
import { checkProductName, createItem, createUser} from "./queries";
import jwt from 'jsonwebtoken';
import { getUserByEmail } from "./queries";
import { createToken, validEmail, validPassword } from "./validation";

//         const passwordMatch = await bcrypt.compare(password,user.password) 


export const signUp = async (req:any,res:any) => {
  try{
    const {name,email,password} = req.body
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

  
 export const addItem = async (req:any,res:any) => {
    try{
      const {token,productname,productdescription,productprice,productcategory,productimage} = req.body
      const verified = jwt.verify(token,'secretpassword')
   
      if(verified) {
        client.query(createItem,[productname,productdescription,productprice,productcategory,productimage])
        res.send(`${productname} added to products of category ${productcategory}`)
      }
      if(!verified) {
        res.send('user not logged in!')
      }

    }catch(err) {
      console.log(err)
      res.status(500).send('internal sever error')
    }
  }
  // {
  //   "email":"testuser@gmail.com", 
  //   "password":"password"
  // }
  // {
  //   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHVzZXJAZ21haWwuY29tIiwiaWF0IjoxNjgyNzc5NTE1fQ.VHH4lEcLiWxiOw4amDpZKQqjUKus5QrYr0DcMPi6QIY",
  //   "productname":"Galaxy Buds",
  //   "productdescription":"Noise cancellation,AKG sound",
  //   "productprice":150,
  //   "productcategory":"Earbuds",
  //   "productimage":"https://www.thesource.ca/medias/20200804113840-108089487-A.jpg-mediaConversion-640-x-480-mediaConversion-400-x-300-0?context=bWFzdGVyfGltYWdlc3wzODkzNnxpbWFnZS9qcGVnfGltYWdlcy9oMmUvaDg1LzkyODIyMjAyNjE0MDYuanBnfGFmZmRmMWNjOTRiMmQ4YTcxMTk0Yzg2NDhjMjg1NjRkNzFiYjI0NzdlMDY3ODMxMTI3MzFlZWQ0Y2UxZTM1YmM"
  // }
