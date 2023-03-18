import express, { Request, Response, Router } from "express";

const User: Router = express.Router();

User.get("/:id", (req: Request, res: Response) => {
  const { name, age, email, address } = req?.body;
  console.log(`userId: ${req?.params?.id} `);
  res.status(200).json({ result: { name, age, email, address } });
});

User.get("/", (req: Request, res: Response) => {
  res.send("Hello User");
});

export default User;
