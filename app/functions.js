"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItem = exports.login = exports.signUp = void 0;
const db_1 = require("./db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const queries_1 = require("./queries");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_2 = require("./queries");
const validation_1 = require("./validation");
//         const passwordMatch = await bcrypt.compare(password,user.password) 
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        if (!validation_1.validEmail) {
            res.send('email not valid');
        }
        if (!validation_1.validPassword) {
            res.send('password must be at least 8 characters');
        }
        db_1.client.query(queries_1.createUser, [name, email, hashedPassword]);
        res.send(`user '${name}' created!`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db_1.client.query(queries_2.getUserByEmail, [email]);
        const user = result.rows[0];
        if (!(0, validation_1.validEmail)(email)) {
            res.status(400).send('email not valid');
        }
        if (!(0, validation_1.validPassword)(password)) {
            res.status(400).send('password must be at least 8 characters');
        }
        if (!user) {
            res.send('no user with this email');
        }
        if (user) {
            const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            if (passwordMatch) {
                const token = (0, validation_1.createToken)(email);
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
const addItem = async (req, res) => {
    try {
        const { token, productname, productdescription, productprice, productcategory, productimage } = req.body;
        const verified = jsonwebtoken_1.default.verify(token, 'secretpassword');
        if (verified) {
            db_1.client.query(queries_1.createItem, [productname, productdescription, productprice, productcategory, productimage]);
            res.send(`${productname} added to products of category ${productcategory}`);
        }
        if (!verified) {
            res.send('user not logged in!');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('internal sever error');
    }
};
exports.addItem = addItem;
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
