import { FastifyInstance } from "fastify";
import { addProduct } from "../services/Products";
import { signUp } from "../services/Signup/Signup";
import { loginSchema, signupSchema } from "../services/Schemas/Schemas";
import { login } from "../services/Login/Login";
import { isLogin } from "../middlewares/authValidation";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", (req: any, res: any) => {
    res.send("working!");
  });

  fastify.post(
    "/login",
    {
      schema: {
        body: loginSchema,
      },
    },
    login
  );

  fastify.post("/additem", { preHandler: isLogin }, addProduct);
  fastify.post("/signup", { schema: { body: signupSchema } }, signUp);
}
