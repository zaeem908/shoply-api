"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenValidation_1 = require("./middlewares/TokenValidation/TokenValidation");
const Products_1 = require("./services/Products");
const Signup_1 = require("./services/Signup/Signup");
const Login_1 = require("./services/Login/Login");
const Schemas_1 = require("./services/Schemas/Schemas");
async function routes(fastify) {
    fastify.get("/", (req, res) => {
        res.send("working!");
    });
    fastify.post("/login", {
        schema: {
            body: Schemas_1.loginSchema,
        },
    }, Login_1.login);
    fastify.post("/additem", { preHandler: TokenValidation_1.TokenValidation }, Products_1.addProduct);
    fastify.post("/signup", { schema: { body: Schemas_1.signupSchema } }, Signup_1.signUp);
}
exports.default = routes;
