import fastify from "fastify";
import { TokenValidation } from "./middlewares/TokenValidation/TokenValidation";
import { addItem } from "./services/AddProduct/AddProduct";
import { signUp } from "./services/Signup/Signup";
import { login } from "./services/Login/Login";

const server = fastify({ logger: true })
server.get('/',(req: any,res:any) => {
    res.send('working!')
})
const loginSchema = {
  type: 'object',
  required: ["email","password"],
  properties: {
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      minLength:8
    }
  }
}
const signupSchema = {
  type: 'object',
  required: ["name","email","password"],
  properties: {
    email: {
      type: "string",
      format: "email"
    },
    name: {
      type: "string"
    },
    password: {
      type: "string",
      minLength:8
    }
  }
}

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
