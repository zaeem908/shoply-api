"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.validPassword = exports.validEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
exports.validEmail = validEmail;
function validPassword(password) {
    if (password.length >= 8) {
        return true;
    }
    else {
        return false;
    }
}
exports.validPassword = validPassword;
async function createToken(data) {
    try {
        const token = jsonwebtoken_1.default.sign({ data: data }, 'secretpassword');
        return token;
    }
    catch (err) {
        console.log(err);
    }
}
exports.createToken = createToken;
