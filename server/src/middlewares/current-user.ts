import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestUser } from "../components/userRoutes/current-user";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.jwt) {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    req.currentUser = payload as RequestUser;
  }

  next();
};
