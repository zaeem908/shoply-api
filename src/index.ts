import fastify from "fastify";
import { addItem, login, signUp } from "./functions"

const server = fastify({ logger: true })
server.get('/',(req: any,res:any) => {
    res.send('working!')
})
server.post('/login',login)
server.post('/additem',addItem)
server.post('/signup',signUp)

server.listen(3000,() => {
    console.log('server running on port 3000')
})



