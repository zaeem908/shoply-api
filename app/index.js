"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const index_1 = __importDefault(require("./Routes/index"));
const server = (0, fastify_1.default)({ logger: true });
server.register(index_1.default);
server.listen(3000, () => {
    console.log("server running on port 3000");
});
// {
//   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHVzZXI5OTIyOTMyQGdtYWlsLmNvbSIsImlhdCI6MTY4MzI2NDE0OX0.wftF0tPYIw4Yl_CT4ZL9Bne7yuUnrgN_lbn1GY-x5Gw",
//   "name":"test3",
//   "price":10,
//   "category":"clothing",
//   "description":"description......",
//   "image":"url....."
//  }
