"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
exports.client = new Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "postgres",
    password: "Zaeem1198!",
    port: 5432
});
exports.client.connect();
