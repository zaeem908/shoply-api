"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const functions_1 = require("./functions");
const server = (0, fastify_1.default)({ logger: true });
server.get('/', (req, res) => {
    res.send('working!');
});
server.post('/login', functions_1.login);
server.post('/additem', functions_1.addItem);
server.post('/signup', functions_1.signUp);
server.listen(3000, () => {
    console.log('server running on port 3000');
});
