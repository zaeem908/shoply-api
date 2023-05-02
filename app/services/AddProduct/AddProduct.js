"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItem = void 0;
const db_1 = require("../../Database/db");
//         const passwordMatch = await bcrypt.compare(password,user.password) 
const addItem = async (req, res) => {
    const createItem = `INSERT INTO shoplyitems (productname,productdescription,productprice,productcategory,productimage) VALUES ($1,$2,$3,$4,$5)`;
    try {
        const { productname, productdescription, productprice, productcategory, productimage } = req.body;
        const result = await db_1.client.query(createItem, [productname, productdescription, productprice, productcategory, productimage]);
        if (result.rowCount > 0) {
            res.send(`${productname} added to products of category ${productcategory}`);
        }
    }
    catch (err) {
        res.status(500).send('failed to add product!');
        console.log(err);
    }
};
exports.addItem = addItem;
