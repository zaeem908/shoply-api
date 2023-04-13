"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubject = exports.forgotPassword = exports.login = void 0;
const db_1 = require("./db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const queries_1 = require("./queries");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_2 = require("./queries");
const validation_1 = require("./validation");
const mail_1 = require("./mail");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield db_1.client.query(queries_2.getUserByEmail, [email]);
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
            const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
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
});
exports.login = login;
const forgotPassword = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const data = yield db_1.client.query('SELECT email,password from users3 WHERE email = $1', [email]);
        const user = data.rows[0];
        if (!(0, validation_1.validEmail)(email)) {
            response.status(400).send('email not valid!');
        }
        if (user.email == email) {
            console.log(mail_1.mail);
            //   sgMail.send(mail)
            //   .then(() => {
            //     console.log('email sent succesfully')
            //     response.status(200).send('email sent succesfully')
            //   }) 
        }
    }
    catch (err) {
        console.log(err);
        response.status(500).send('no such email in database');
    }
});
exports.forgotPassword = forgotPassword;
const addSubject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, subject } = request.body;
        const verified = jsonwebtoken_1.default.verify(token, 'secretpassword');
        if (verified) {
            db_1.client.query(queries_1.createSubject, [subject]);
            response.send(`${subject} added to subjects`);
        }
        if (!verified) {
            response.send('user not logged in!');
        }
    }
    catch (err) {
        console.log(err);
        response.status(500).send('internal sever error');
    }
});
exports.addSubject = addSubject;
