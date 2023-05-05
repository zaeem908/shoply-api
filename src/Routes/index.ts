import { FastifyInstance } from "fastify";
import { addProduct, allProducts, categories } from "../services/Products";
import { signUp } from "../services/Signup";
import { login } from "../services/Login";
import { loginSchema, signupSchema } from "../services/Schemas";
import { isLogin } from "../middlewares/authValidation";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/v1/home", (req: any, res: any) => {
    res.send("working!");
  });

  fastify.post(
    "/v1/login",
    {
      schema: {
        body: loginSchema,
      },
    },
    login
  );

  fastify.post("/v1/additems", { preHandler: isLogin }, addProduct);
  fastify.post("/v1/signup", { schema: { body: signupSchema } }, signUp);
  fastify.post("/v1/products", { preHandler: isLogin }, allProducts);
  fastify.post("/v1/categories", { preHandler: isLogin }, categories);
}
