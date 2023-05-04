"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const Database_1 = require("../../Database");
const addProduct = async (req, res) => {
    const createItem = `INSERT INTO shoplyitems2 (name,description,price,category,image) VALUES ($1,$2,$3,$4,$5)`;
    try {
        const { name, description, price, category, image } = req.body;
        const result = await Database_1.client.query(createItem, [
            name,
            description,
            price,
            category,
            image,
        ]);
        if (result.rowCount > 0) {
            res.send(`${name} added to products of category ${category}`);
        }
    }
    catch (err) {
        res.status(500).send("failed to add product!");
        console.log(err);
    }
};
exports.addProduct = addProduct;
