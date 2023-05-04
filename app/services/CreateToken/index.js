"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createToken(data) {
    try {
        const token = jsonwebtoken_1.default.sign({ data: data }, "secretpassword");
        return token;
    }
    catch (err) {
        console.log(err);
    }
}
exports.createToken = createToken;
