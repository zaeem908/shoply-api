"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.categories = exports.allProducts = exports.addProduct = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Database_1 = require("../../Database");
const addProduct = async (req, res) => {
    const createItem = `INSERT INTO shoplyitems2 (name, description, price, categoryid, image) VALUES ($1, $2, $3, $4, $5)`;
    const findCategory = `SELECT id FROM shoplycategories WHERE name = $1`;
    try {
        const { name, description, price, category, image } = req.body;
        const result1 = await Database_1.client.query(findCategory, [category]);
        const categoryId = result1.rows[0].id;
        const result2 = await Database_1.client.query(createItem, [
            name,
            description,
            price,
            categoryId,
            image,
        ]);
        if (result2.rowCount > 0) {
            res.send(`${name} added to products of category ${category}`);
        }
    }
    catch (err) {
        res.status(500).send("failed to add product!");
        console.log(err);
    }
};
exports.addProduct = addProduct;
const allProducts = async (request, reply) => {
    try {
        const { category } = request.query;
        const query1 = await Database_1.client.query(`SELECT * FROM shoplycategories WHERE name = $1`, [category]);
        const query2 = category
            ? `SELECT * FROM shoplyitems2 WHERE categoryid = $1`
            : "SELECT * FROM shoplyitems2";
        let categoryId = null;
        if (category) {
            categoryId = query1.rows[0].id;
        }
        const params = category ? [categoryId] : [];
        const result = await Database_1.client.query(query2, params);
        const products = result.rows;
        reply.send(products);
    }
    catch (e) {
        console.log(e);
        reply.status(500).send(e);
    }
};
exports.allProducts = allProducts;
const categories = async (req, res) => {
    try {
        const query = "SELECT * FROM shoplycategories";
        const result = await Database_1.client.query(query);
        const categories = result.rows;
        const names = categories.map((c) => c.name);
        res.send(names);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("server error");
    }
};
exports.categories = categories;
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
