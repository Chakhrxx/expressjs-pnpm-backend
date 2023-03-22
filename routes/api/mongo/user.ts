import { Request, Response, Router, NextFunction } from "express";
import User, { InterfaceUser } from "../../../models/User";
import { checkUserRole } from "../../../middleware/authentication";
import { userRules, validate } from "../../validators";

const router: Router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .select({ _id: 0, name: 1, email: 1 })
    .exec()
    .then((users: InterfaceUser[]) => {
      if (users?.length === 0) {
        return res.status(204).json({
          status: "Failed",
          result: null,
          message: `No contens`,
        });
      } else {
        res.status(200).json({ status: "Success", result: users });
      }
    })
    .catch((err: Error) => {
      next(err);
    });
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req?.params?.id;

  User.findById(id)
    .select({ _id: 0, name: 1, email: 1 })
    .exec()
    .then((user: InterfaceUser | null) => {
      res.status(200).json({ status: "Success", result: user });
    })
    .catch((err: Error) => {
      return res.status(404).json({
        status: "Failed",
        result: null,
        message: `User with id:${id} does not exists`,
      });
    });
});

router.post(
  "/",
  userRules,
  validate,
  // checkUserRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req?.body;

    const newUser = new User({ ...userData });

    await newUser
      .save()
      .then((user: InterfaceUser) => {
        res.status(201).json({ status: "Success", result: user });
      })
      .catch((err: Error) => {
        next(err);
      });
  }
);

router.put(
  "/:id",
  checkUserRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;
    const userData = req?.body;

    User.findByIdAndUpdate(id, userData, { new: true })
      .exec()
      .then((updatedUser: InterfaceUser | null) => {
        res.status(200).json({ status: "Success", result: updatedUser });
      })
      .catch((err: Error) => {
        res.status(204).send("No Content");
      });
  }
);

router.delete(
  "/:id",
  checkUserRole,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;

    User.findByIdAndDelete(id)
      .select({ _id: 0, name: 1, email: 1 })
      .exec()
      .then((deletedUser: InterfaceUser | null) => {
        res.status(200).json({ status: "Success", result: deletedUser });
      })
      .catch((err: Error) => {
        res.status(204).send("No Content");
      });
  }
);

export default router;
