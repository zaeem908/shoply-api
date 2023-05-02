"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../validation");
const signUp = async (req, res) => {
    const createUser = 'INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)';
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        if (!validation_1.validEmail) {
            res.send('email not valid');
        }
        if (!validation_1.validPassword) {
            res.send('password must be at least 8 characters');
        }
        db_1.client.query(createUser, [name, email, hashedPassword]);
        res.send(`user '${name}' created!`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};
exports.signUp = signUp;
