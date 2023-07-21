import dotenv from "dotenv";
import { jwtVerify } from "jose";

dotenv.config();

const validateJWTIngreso = async (req, res, next) => {
  let key = process.env.KEY;
  let cookie = req.cookies["auth"];
  try {
    let encoder = new TextEncoder();
    let jwtaccess = await jwtVerify(cookie, encoder.encode(key));
    req.user = jwtaccess;
    next();
  } catch (err) {
    res.send({ status: 401, message: "Token invalido" });
  }
};

export default validateJWTIngreso;
