import { client } from "../../Database";
import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";

export const signUp = async (req: FastifyRequest, res: FastifyReply) => {
  const createUser =
    "INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)";

  try {
    const { name, email, password }: userReqBody = req.body as userReqBody;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(createUser, [
      name,
      email,
      hashedPassword,
    ]);
    if (result.rowCount > 0) {
      res.send(`user '${name}' created!`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("could not create user");
  }
};
