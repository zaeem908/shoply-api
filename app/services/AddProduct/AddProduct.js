"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItem = void 0;
const db_1 = require("../../Database/db");
const addItem = async (req, res) => {
    const createItem = `INSERT INTO shoplyitems2 (name,description,price,category,image) VALUES ($1,$2,$3,$4,$5)`;
    try {
        const { name, description, price, category, image } = req.body;
        const result = await db_1.client.query(createItem, [
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
exports.addItem = addItem;
