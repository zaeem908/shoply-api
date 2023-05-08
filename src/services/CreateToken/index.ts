import jwt from "jsonwebtoken";

export async function createToken(data: any) {
  try {
    const token = jwt.sign({ email: data }, "secretpassword");
    return token;
  } catch (err) {
    console.log(err);
  }
}
