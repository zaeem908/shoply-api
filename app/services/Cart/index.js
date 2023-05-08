"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementItemQty = exports.addToCart = exports.cart = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Database_1 = require("../../Database");
const cart = async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userEmail = decodedToken.email;
        const userData = await Database_1.client.query("SELECT * FROM shoplyusers WHERE email = $1", [userEmail]);
        const userId = userData.rows[0].id;
        const cartName = `cart${userId}`;
        const userCart = await Database_1.client.query(`SELECT * FROM ${cartName}`);
        const userCartData = userCart.rows;
        res.send(userCartData);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("server error");
    }
};
exports.cart = cart;
const addToCart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userEmail = decodedToken.email;
        const userData = await Database_1.client.query("SELECT * FROM shoplyusers WHERE email = $1", [userEmail]);
        const userId = userData.rows[0].id;
        const cartName = `cart${userId}`;
        const itemData = await Database_1.client.query(`SELECT * FROM shoplyitems2 WHERE id = $1`, [productId]);
        if (!itemData.rows[0]) {
            throw new Error(`Product with id ${productId} not found`);
        }
        const productName = itemData.rows[0].name;
        const productPrice = itemData.rows[0].price;
        const quantity = 1;
        const inputCartData = await Database_1.client.query(`INSERT INTO ${cartName} (item,price,qty) VALUES ($1,$2,$3)`, [productName, productPrice, quantity]);
        if (inputCartData.rowCount > 0) {
            res.send("item added to your cart!");
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send("server error");
    }
};
exports.addToCart = addToCart;
const incrementItemQty = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userEmail = decodedToken.email;
        const userData = await Database_1.client.query("SELECT * FROM shoplyusers WHERE email = $1", [userEmail]);
        const userId = userData.rows[0].id;
        const cartName = `cart${userId}`;
        const incrementQty = await Database_1.client.query(`UPDATE ${cartName} SET qty = qty + 1 WHERE id = $1`, [productId]);
        if (incrementQty.rowCount > 0) {
            res.send("Item incremented by one!" + cartName);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send("server error");
    }
};
exports.incrementItemQty = incrementItemQty;
