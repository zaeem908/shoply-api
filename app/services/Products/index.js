"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = exports.allProducts = exports.addProduct = void 0;
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
