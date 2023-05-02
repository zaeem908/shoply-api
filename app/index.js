"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const TokenValidation_1 = require("./middlewares/TokenValidation/TokenValidation");
const AddProduct_1 = require("./services/AddProduct/AddProduct");
const Signup_1 = require("./services/Signup/Signup");
const Login_1 = require("./services/Login/Login");
const server = (0, fastify_1.default)({ logger: true });
server.get('/', (req, res) => {
    res.send('working!');
});
const loginSchema = {
    type: 'object',
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            format: "email"
        },
        password: {
            type: "string",
            minLength: 8
        }
    }
};
const signupSchema = {
    type: 'object',
    required: ["name", "email", "password"],
    properties: {
        email: {
            type: "string",
            format: "email"
        },
        name: {
            type: "string"
        },
        password: {
            type: "string",
            minLength: 8
        }
    }
};
server.post('/login', {
    schema: {
        body: loginSchema
    },
}, Login_1.login);
server.post('/additem', { preHandler: TokenValidation_1.TokenValidation }, AddProduct_1.addItem);
server.post('/signup', { schema: { body: signupSchema } }, Signup_1.signUp);
server.listen(3000, () => {
    console.log('server running on port 3000');
});
