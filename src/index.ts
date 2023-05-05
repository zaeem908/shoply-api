import fastify from "fastify";
import routes from "./Routes/index";

const server = fastify({ logger: true });

server.register(routes);

server.listen(3000, () => {
  console.log("server running on port 3000");
});

// {
//   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHVzZXI5OTIyOTMyQGdtYWlsLmNvbSIsImlhdCI6MTY4MzI2NDE0OX0.wftF0tPYIw4Yl_CT4ZL9Bne7yuUnrgN_lbn1GY-x5Gw",
//   "name":"test3",
//   "price":10,
//   "category":"clothing",
//   "description":"description......",
//   "image":"url....."
//  }
