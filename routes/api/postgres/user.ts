import { checkAuth } from "./../../../middleware/authentication";
import { Request, Response, Router, NextFunction } from "express";
// import User, { InterfaceUser } from "../../../models/User";
import { checkUserRole } from "../../../middleware/authentication";
import { userRules, validate } from "../../validators";
import {
  postgresQuery,
  interfacePostgresQuery,
} from "../../../config/postgresDB";

import { v4 as uuidv4 } from "uuid";

const router: Router = Router();

export const checkPostgresId = async (next: NextFunction) => {
  const checkIdObject: interfacePostgresQuery = {
    text: `SELECT _id FROM users WHERE _id = '?';`,
    values: [uuidv4().replace(/-/g, "")],
  };
  await postgresQuery(checkIdObject).then((result) => {
    if (!result[0]?._id) {
      next();
    } else {
      console.log(`User with id: ${checkIdObject.values[0]} does not exists`);
      checkPostgresId(next);
    }
  });
};

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const queryObject: interfacePostgresQuery = {
    text: "SELECT name, email FROM users;",
    values: [],
  };
  checkPostgresId(next);
  await postgresQuery(queryObject)
    .then((result) => {
      res.status(200).json({ status: "Success", result: result });
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "Failed",
        result: null,
        message: error,
      });
    });
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req?.params?.id;

  const queryObject: interfacePostgresQuery = {
    text: `SELECT name, email FROM users WHERE _id = '?';`,
    values: [id],
  };

  await postgresQuery(queryObject)
    .then((result) => {
      res.status(200).json({ status: "Success", result: result });
    })
    .catch((error: Error) => {
      res.status(404).json({
        status: "Failed",
        result: null,
        message: `User with id : ${id} does not exists`,
      });
    });
});

router.post(
  "/",
  userRules,
  validate,
  checkUserRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req?.body;

    const queryObject: interfacePostgresQuery = {
      text: `INSERT INTO users (_id, name, password, email, role) VALUES (?, ?, ?, ?, ?) RETURNING *;`,
      values: [uuidv4().replace(/-/g, ""), Object.values(userData)],
    };

    await postgresQuery(queryObject)
      .then((result) => {
        res.status(201).json({
          status: "Success",
          result: result,
        });
      })
      .catch((error: Error) => {
        res.json({
          status: "Failed",
          result: null,
          message: error,
        });
      });
  }
);

router.put(
  "/:id",
  checkUserRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;
    const userData = req?.body;

    const queryObject: interfacePostgresQuery = {
      text: `UPDATE users ? WHERE _id = '?' RETURNING *;`,
      values: [
        `SET ${Object.entries(userData)
          .map(([key, value]) =>
            !["age"].includes(key) ? `${key} = '${value}'` : `${key} = ${value}`
          )
          .join(", ")}`,
        id,
      ],
    };

    await postgresQuery(queryObject)
      .then((result) => {
        res.status(200).json({
          status: "Success",
          result: result,
          message: `User with id : ${id} has been updated`,
        });
      })
      .catch((error: Error) => {
        res.status(204).json({
          status: "Failed",
          result: null,
          message: `User with id : ${id} does not exists`,
        });
      });
  }
);

router.delete(
  "/:id",
  checkUserRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;

    const queryObject: interfacePostgresQuery = {
      text: `DELETE FROM users WHERE _id = '?' RETURNING *;`,
      values: [id],
    };

    await postgresQuery(queryObject)
      .then((result) => {
        res.status(204).json({
          status: "Success",
          message: `User with id : ${id} has been deleted`,
        });
      })
      .catch((error: Error) => {
        res.status(404).json({
          status: "Failed",
          result: null,
          message: `User with id : ${id} does not exists`,
        });
      });
  }
);

export default router;
