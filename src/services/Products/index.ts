import { client } from "../../Database";
import { FastifyReply, FastifyRequest } from "fastify";

export const addProduct = async (req: FastifyRequest, res: FastifyReply) => {
  const createItem = `INSERT INTO shoplyitems2 (name,description,price,category,image) VALUES ($1,$2,$3,$4,$5)`;

  try {
    const { name, description, price, category, image }: userReqBody =
      req.body as userReqBody;

    const result = await client.query(createItem, [
      name,
      description,
      price,
      category,
      image,
    ]);
    if (result.rowCount > 0) {
      res.send(`${name} added to products of category ${category}`);
    }
  } catch (err: any) {
    res.status(500).send("failed to add product!");
    console.log(err);
  }
};
