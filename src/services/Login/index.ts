import { client } from "../../Database";
import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { createToken } from "../CreateToken";

export const login = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserByEmail = `SELECT email,password FROM shoplyusers WHERE email = $1`;

  try {
    const { email, password }: userReqBody = req.body as userReqBody;
    const result = await client.query(getUserByEmail, [email]);
    const user = result.rows[0];

    if (!user) {
      res.send("no user with this email");
    }
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = createToken(email);
        res.send("login succesful");
        console.log(token);
      } else {
        res.status(400).send("password not matched");
      }
    }
  } catch (err) {
    res.status(500).send("internal server error");
  }
};

///////////////////// testing /////////////////////
// {
//   "email":"testuser@gmail.com",
//   "password":"password"
// }
