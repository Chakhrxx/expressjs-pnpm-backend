import { Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";

import { userSchema } from "../validators/user";

// Error Handler
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json({ status: "Failed", errors: errors.array() });

  return next();
};

export const userRules = checkSchema(userSchema);
