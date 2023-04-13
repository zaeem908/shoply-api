"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function createToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = jsonwebtoken_1.default.sign({ data: data }, 'secretpassword');
            return token;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createToken = createToken;
