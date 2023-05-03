import fastify from "fastify";
import routes from "./Routes/index";

const server = fastify({ logger: true });

server.register(routes);

server.listen(3000, () => {
  console.log("server running on port 3000");
});
