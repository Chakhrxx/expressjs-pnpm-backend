import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import { checkAuth } from "../middleware/middleware";

const jwt = require("jsonwebtoken");

dotenv.config();

//Router
import User from "./api/User/user"; // import the userRouter module from the user.ts file

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/cheatAuth/:id", (req: Request, res: Response) => {
  const { name, age, email, address } = req?.body;
  const userData = {
    userId: req?.params?.id,
    name,
    email,
  };
  const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "1h" });
  res.status(200).json({ token: `Bearer ${token}` });
});

app.use(checkAuth);

app.use("/user", User);

export const server: http.Server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
