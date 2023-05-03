import fastify from "fastify";
import { TokenValidation } from "./middlewares/TokenValidation/TokenValidation";
import { addItem } from "./services/AddProduct/AddProduct";
import { signUp } from "./services/Signup/Signup";
import { login } from "./services/Login/Login";
import { loginSchema, signupSchema } from "./services/Schemas/Schemas";

const server = fastify({ logger: true })
server.get('/',(req: any,res:any) => {
    res.send('working!')
})


server.post('/login',  {
  schema: {
    body: loginSchema
  },
},login)

server.post('/additem',{preHandler : TokenValidation},addItem)
server.post('/signup',{schema:{body:signupSchema}},signUp)

server.listen(3000,() => {
    console.log('server running on port 3000')
})
