import jwt, { JwtPayload } from "jsonwebtoken";
import { client } from "../../Database";
import { FastifyReply, FastifyRequest } from "fastify";

export const addProduct = async (req: FastifyRequest, res: FastifyReply) => {
  const createItem = `INSERT INTO shoplyitems2 (name, description, price, categoryid, image) VALUES ($1, $2, $3, $4, $5)`;
  const findCategory = `SELECT id FROM shoplycategories WHERE name = $1`;
  try {
    const { name, description, price, category, image }: userReqBody =
      req.body as userReqBody;

    const result1 = await client.query(findCategory, [category]);
    const categoryId = result1.rows[0].id;
    const result2 = await client.query(createItem, [
      name,
      description,
      price,
      categoryId,
      image,
    ]);
    if (result2.rowCount > 0) {
      res.send(`${name} added to products of category ${category}`);
    }
  } catch (err: any) {
    res.status(500).send("failed to add product!");
    console.log(err);
  }
};

export const allProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { category } = request.query as userReqBody;
    const query1 = await client.query(
      `SELECT * FROM shoplycategories WHERE name = $1`,
      [category]
    );
    const query2 = category
      ? `SELECT * FROM shoplyitems2 WHERE categoryid = $1`
      : "SELECT * FROM shoplyitems2";
    let categoryId = null;

    if (category) {
      categoryId = query1.rows[0].id;
    }

    const params = category ? [categoryId] : [];

    const result = await client.query(query2, params);
    const products = result.rows;
    reply.send(products);
  } catch (e) {
    console.log(e);
    reply.status(500).send(e);
  }
};

export const categories = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const query = "SELECT * FROM shoplycategories";
    const result = await client.query(query);
    const categories = result.rows;
    const names = categories.map((c) => c.name);
    res.send(names);
  } catch (e) {
    console.log(e);
    res.status(500).send("server error");
  }
};

export const addToCart = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { token, productId }: userReqBody = req.body as userReqBody;
    const decodedToken: JwtPayload = jwt.decode(token) as JwtPayload;
    const userEmail = decodedToken.email;
    const userData = await client.query(
      "SELECT * FROM shoplyusers WHERE email = $1",
      [userEmail]
    );
    const userId = userData.rows[0].id;
    const cartName = `cart${userId}`;
    const itemData = await client.query(
      `SELECT * FROM shoplyitems2 WHERE id = $1`,
      [productId]
    );
    if (!itemData.rows[0]) {
      throw new Error(`Product with id ${productId} not found`);
    }
    const productName = itemData.rows[0].name;
    const productPrice = itemData.rows[0].price;
    const quantity = 1;
    const inputCartData = await client.query(
      `INSERT INTO ${cartName} (item,price,qty) VALUES ($1,$2,$3)`,
      [productName, productPrice, quantity]
    );
    if (inputCartData.rowCount > 0) {
      res.send("item added to your cart!");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("server error");
  }
};
