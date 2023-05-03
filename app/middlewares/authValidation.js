"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLogin = (req, res, next) => {
    const { token } = req.body;
    const verified = jsonwebtoken_1.default.verify(token, "secretpassword");
    if (!verified) {
        res.send("user not verified");
    }
    if (verified) {
        next();
    }
};
exports.isLogin = isLogin;
