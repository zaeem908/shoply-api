"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../../validation");
const login = async (req, res) => {
    const getUserByEmail = `SELECT email,password FROM shoplyusers WHERE email = $1`;
    try {
        const { email, password } = req.body;
        const result = await db_1.client.query(getUserByEmail, [email]);
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
