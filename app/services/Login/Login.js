"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../../Database/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createToken_1 = require("../CreateToken/createToken");
const login = async (req, res) => {
    const getUserByEmail = `SELECT email,password FROM shoplyusers WHERE email = $1`;
    try {
        const { email, password } = req.body;
        const result = await db_1.client.query(getUserByEmail, [email]);
        const user = result.rows[0];
        if (!user) {
            res.send('no user with this email');
        }
        if (user) {
            const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            if (passwordMatch) {
                const token = (0, createToken_1.createToken)(email);
                res.send("login succesful");
                console.log(token);
            }
            else {
                res.status(400).send('password not matched');
            }
        }
    }
    catch (err) {
        res.status(500).send('internal server error');
    }
};
exports.login = login;
///////////////////// testing /////////////////////
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
