"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = require("../services/Products");
const Signup_1 = require("../services/Signup");
const Login_1 = require("../services/Login");
const Schemas_1 = require("../services/Schemas");
const authValidation_1 = require("../middlewares/authValidation");
async function routes(fastify) {
    fastify.get("/v1/home", (req, res) => {
        res.send("working!");
    });
    fastify.post("/v1/login", {
        schema: {
            body: Schemas_1.loginSchema,
        },
    }, Login_1.login);
    fastify.post("/v1/additems", { preHandler: authValidation_1.isLogin }, Products_1.addProduct);
    fastify.post("/v1/signup", { schema: { body: Schemas_1.signupSchema } }, Signup_1.signUp);
    fastify.post("/v1/products", { preHandler: authValidation_1.isLogin }, Products_1.allProducts);
    fastify.post("/v1/categories", { preHandler: authValidation_1.isLogin }, Products_1.categories);
}
exports.default = routes;
