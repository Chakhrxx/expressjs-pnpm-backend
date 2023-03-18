import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  userData?: { userId: string };
}

export const checkAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
      userId: string;
    };
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      error: error,
    });
  }
};
