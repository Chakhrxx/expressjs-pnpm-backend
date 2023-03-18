import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

var app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export const server: http.Server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
