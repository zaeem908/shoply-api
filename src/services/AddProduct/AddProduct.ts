import { client } from "../../Database/db";
import bcrypt from 'bcryptjs';
import { FastifyReply, FastifyRequest } from "fastify";

//         const passwordMatch = await bcrypt.compare(password,user.password) 





export const addItem = async (req:FastifyRequest,res:FastifyReply) => {
    const createItem = `INSERT INTO shoplyitems (productname,productdescription,productprice,productcategory,productimage) VALUES ($1,$2,$3,$4,$5)`
  
      try{
        const {productname,productdescription,productprice,productcategory,productimage}:userReqBody = req.body as userReqBody
  
        const result = await client.query(createItem,[productname,productdescription,productprice,productcategory,productimage])
                  if(result.rowCount > 0) {
                    res.send(`${productname} added to products of category ${productcategory}`)
                  } 
  
      }catch(err:any) {
    
          res.status(500).send('failed to add product!')
         console.log(err)
      }
    }
  
  