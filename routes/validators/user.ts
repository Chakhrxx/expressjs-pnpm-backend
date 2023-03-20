import { Schema } from "express-validator";

export const userSchema: Schema = {
  name: {
    notEmpty: { errorMessage: "Username is required" },
    trim: true,
  },
  password: {
    notEmpty: { errorMessage: "password is required" },
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      options: { min: 7 },
    },
  },
  email: {
    notEmpty: { errorMessage: "password is required" },
    isEmail: {
      bail: true,
    },
  },
  role: {
    notEmpty: { errorMessage: "role is required" },
    trim: true,
  },
};
