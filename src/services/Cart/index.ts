import jwt, { JwtPayload } from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { client } from "../../Database";

export const cart = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { token }: userReqBody = req.body as userReqBody;
    const decodedToken: JwtPayload = jwt.decode(token) as JwtPayload;
    const userEmail = decodedToken.email;
    const userData = await client.query(
      "SELECT * FROM shoplyusers WHERE email = $1",
      [userEmail]
    );
    const userId = userData.rows[0].id;
    const cartName = `cart${userId}`;
    const userCart = await client.query(`SELECT * FROM ${cartName}`);
    const userCartData = userCart.rows;
    res.send(userCartData);
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

export const incrementItemQty = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
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
    const incrementQty = await client.query(
      `UPDATE ${cartName} SET qty = qty + 1 WHERE id = $1`,
      [productId]
    );
    if (incrementQty.rowCount > 0) {
      res.send("Item incremented by one!" + cartName);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("server error");
  }
};
