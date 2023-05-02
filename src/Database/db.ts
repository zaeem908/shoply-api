import pkg from 'pg';
const { Client } = pkg;

export const client = new Client({
    user:"postgres",
    host:"127.0.0.1",
    database:"postgres", 
    password:"Zaeem1198!",  
    port:5432
}); 
client.connect();