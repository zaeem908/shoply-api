"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = exports.getUserByEmail = void 0;
exports.getUserByEmail = `SELECT email,password FROM users3 WHERE email = $1`;
exports.createSubject = `INSERT INTO subjects2 (subject) VALUES ($1)`;
