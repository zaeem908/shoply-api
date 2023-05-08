"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const Database_1 = require("../../Database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const createUser = "INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)";
        const result = await Database_1.client.query(createUser, [
            name,
            email,
            hashedPassword,
        ]);
        if (result.rowCount > 0) {
            const result2 = await Database_1.client.query(`SELECT * FROM shoplyusers WHERE email = $1`, [email]);
            const userId = result2.rows[0].id;
            const tableName = `cart${userId}`;
            res.send(`user '${name}' created!`);
            await Database_1.client.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id serial PRIMARY KEY,item VARCHAR(255) NOT NULL,price INTEGER NOT NULL,qty INTEGER NOT NULL, UNIQUE (item));`);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("could not create user");
    }
};
exports.signUp = signUp;
