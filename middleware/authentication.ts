import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { json } from "stream/consumers";
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

export const checkUserRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(".");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = JSON.parse(atob(String(token[1])))?._doc;

    const { role } = decodedToken;

    if (role === "guest") {
      return res.status(403).json({ message: "Access forbidden" });
    } else {
      next();
    }
  } catch (error) {}
};
