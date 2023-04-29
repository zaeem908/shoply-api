import jwt from 'jsonwebtoken';



export function validEmail(email:any) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
 }
 
 export function validPassword(password:any) {
      
   if(password.length >= 8) {
     return true
   }else {
     return false
   }
 }

 export async function createToken(data:any) {
    try{
   const token = jwt.sign({data:data},'secretpassword')
   return token
 }
 catch(err) {
    console.log(err) 
 }
 }

 