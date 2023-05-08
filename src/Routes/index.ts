import { FastifyInstance } from "fastify";
import { addProduct, allProducts, categories } from "../services/Products";
import { signUp } from "../services/Signup";
import { login } from "../services/Login";
import { loginSchema, signupSchema } from "../services/Schemas";
import { isLogin } from "../middlewares/authValidation";
import { addToCart, cart, incrementItemQty } from "../services/Cart";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/api/v1/home", (req: any, res: any) => {
    res.send("working!");
  });

  fastify.post(
    "/api/v1/login",
    {
      schema: {
        body: loginSchema,
      },
    },
    login
  );

  fastify.post("/api/v1/additems", { preHandler: isLogin }, addProduct);
  fastify.post("/api/v1/signup", { schema: { body: signupSchema } }, signUp);
  fastify.post("/api/v1/products", { preHandler: isLogin }, allProducts);
  fastify.post("/api/v1/categories", { preHandler: isLogin }, categories);
  fastify.post("/api/v1/cart", { preHandler: isLogin }, cart);
  fastify.post(
    "/api/v1/cart/increment",
    { preHandler: isLogin },
    incrementItemQty
  );
  fastify.post(
    "/api/v1/products/addtocart",
    { preHandler: isLogin },
    addToCart
  );
}
