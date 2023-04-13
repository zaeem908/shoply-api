import fastify from "fastify"
import { addSubject, forgotPassword, login } from "./functions"

const server = fastify()
//  import  from './requests'
 
server.get('/',(req: any,res:any) => {
    res.send('working!')
})
server.post('/login',login)
server.post('/forgotpassword',forgotPassword)
server.post('/addsubject',addSubject)

server.listen(3000,() => {
    console.log('server running on port 3000')
})



