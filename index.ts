import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";
// import { setupSwagger } from "./middleware/swagger/swagger";
import { setupSwagger } from "./docs/openapi";

import { checkAuth } from "./middleware/authentication";
import { connectMongo } from "./config/mongoDB";
import { connectPostgres } from "./config/postgresDB";

import User, { InterfaceUser } from "./models/User";

import mongoRoutes from "./routes/api/mongo/index";
import postresRoutes from "./routes/api/postgres/index";

dotenv.config();

// Initialise Express
const app: Express = express();
app.use(express.urlencoded({ extended: true }));

// middle call swagger
setupSwagger(app);

// Connect to PostgresDB
connectPostgres();

// Connect to MongoDB
connectMongo();

// Body Middleware
app.use(express.json({ limit: "10mb" }));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api-docs");
});

app.post(
  "/creatToken/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;

    await User.findById(id)
      .select({ _id: 1, name: 1, email: 1, role: 1 })
      .exec()
      .then((user: InterfaceUser | null) => {
        if (!user) {
          return res.status(404).json({
            status: "Failed",
            result: null,
            message: `User with id:${id} does not exists`,
          });
        } else {
          const token = jwt.sign({ ...user }, process.env.JWT_KEY, {
            expiresIn: "1h",
          });

          res.status(200).send(token);
        }
      })
      .catch((err: Error) => {
        return res.status(404).json({
          status: "Failed",
          result: null,
          message: `User with id:${id} does not exists`,
        });
      });
  }
);

// app.use(checkAuth);

app.use("/mongo", mongoRoutes);
app.use("/postgres", postresRoutes);

const port = process.env.PORT || 3000;

export const server: http.Server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
