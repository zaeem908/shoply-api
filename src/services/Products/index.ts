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
