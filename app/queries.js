"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.createItem = exports.checkProductName = exports.getUserByEmail = void 0;
exports.getUserByEmail = `SELECT email,password FROM shoplyusers WHERE email = $1`;
exports.checkProductName = `SELECT productname FROM shoplyitems WHERE productname = $1`;
exports.createItem = `INSERT INTO shoplyitems (productname,productdescription,productprice,productcategory,productimage) VALUES ($1,$2,$3,$4,$5)`;
exports.createUser = 'INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)';
