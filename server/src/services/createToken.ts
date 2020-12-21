import jwt from "jsonwebtoken";
import { UserDocument } from "../models/user";

export const createToken = (user: object) => {
  const userJwt = jwt.sign(user, process.env.JWT_KEY!);
  return userJwt;
};
