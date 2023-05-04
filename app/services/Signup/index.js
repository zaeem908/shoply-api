"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const Database_1 = require("../../Database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUp = async (req, res) => {
    const createUser = "INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)";
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const result = await Database_1.client.query(createUser, [
            name,
            email,
            hashedPassword,
        ]);
        if (result.rowCount > 0) {
            res.send(`user '${name}' created!`);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("could not create user");
    }
};
exports.signUp = signUp;
