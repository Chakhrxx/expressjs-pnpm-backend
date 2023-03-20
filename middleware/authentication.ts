import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { json } from "stream/consumers";
dotenv.config();

interface AuthRequest extends Request {
  userData?: { userId: string };
}

interface TokenPayload {
  role: string;
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
  const token = req.headers.authorization.split(".")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = JSON.parse(atob(String(token)));
    const { role } = decodedToken;
    console.log("role", role);

    if (role === "guest") {
      return res.status(403).json({ message: "Access forbidden" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Test" });
  }
};
