import fastify from "fastify";
import { TokenValidation } from "./middlewares/TokenValidation/TokenValidation";
import { addItem } from "./services/AddProduct/AddProduct";
import { signUp } from "./services/Signup/Signup";
import { login } from "./services/Login/Login";

const server = fastify({ logger: true })
server.get('/',(req: any,res:any) => {
    res.send('working!')
})
server.post('/login',login)

server.post('/additem',{preHandler : TokenValidation},addItem)
server.post('/signup',signUp)

server.listen(3000,() => {
    console.log('server running on port 3000')
})



