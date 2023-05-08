import { client } from "../../Database";
import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";

export const signUp = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { name, email, password }: userReqBody = req.body as userReqBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser =
      "INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)";
    const result = await client.query(createUser, [
      name,
      email,
      hashedPassword,
    ]);
    if (result.rowCount > 0) {
      const result2 = await client.query(
        `SELECT * FROM shoplyusers WHERE email = $1`,
        [email]
      );
      const userId = result2.rows[0].id;
      const tableName = `cart${userId}`;
      res.send(`user '${name}' created!`);
      await client.query(
        `CREATE TABLE IF NOT EXISTS ${tableName} (id serial PRIMARY KEY,item VARCHAR(255) NOT NULL,price INTEGER NOT NULL,qty INTEGER NOT NULL, UNIQUE (item));`
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("could not create user");
  }
};
