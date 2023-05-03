"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Schemas_1 = require("../services/Schemas/Schemas");
const Login_1 = require("../services/Login/Login");
const Signup_1 = require("../services/Signup/Signup");
const AddProduct_1 = require("../services/AddProduct/AddProduct");
const TokenValidation_1 = require("../middlewares/TokenValidation/TokenValidation");
__1.server.get("/", (req, res) => {
    res.send("working!");
});
__1.server.post("/login", {
    schema: {
        body: Schemas_1.loginSchema,
    },
}, Login_1.login);
__1.server.post("/additem", { preHandler: TokenValidation_1.TokenValidation }, AddProduct_1.addItem);
__1.server.post("/signup", { schema: { body: Schemas_1.signupSchema } }, Signup_1.signUp);
