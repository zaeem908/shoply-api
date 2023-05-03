"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
exports.loginSchema = {
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
exports.signupSchema = {
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
