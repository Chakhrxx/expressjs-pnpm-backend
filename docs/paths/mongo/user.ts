import { Success } from "../../components/responses";
import { userParam } from "../../components/parameter";
import { swaggerUserSchema } from "../../components/schema";

export const mongoUserAPI = {
  get: {
    summary: "Returns a list of users",
    tags: ["MongoDB"],
    responses: {
      200: Success,
    },
  },
  post: {
    summary: "Creates a user.",
    tags: ["MongoDB"],
    requestBody: {
      required: ["username", "password", "email", "role"],
      content: {
        "application/json": {
          schema: swaggerUserSchema,
        },
      },
    },
    responses: {
      201: {
        description: "Created",
      },
    },
  },
};

export const mongoUserAPIbyParam = {
  get: {
    summary: "Returns a list of users",
    tags: ["MongoDB"],
    parameters: [userParam?.id],
    responses: {
      200: Success,
    },
  },
  put: {
    summary: "Returns a list of users",
    tags: ["MongoDB"],
    parameters: [userParam?.id],
    requestBody: {
      required: ["username", "password", "email", "role"],
      content: {
        "application/json": {
          schema: swaggerUserSchema,
        },
      },
    },
    responses: {
      200: Success,
    },
  },
  delete: {
    summary: "Returns a list of users",
    tags: ["MongoDB"],
    parameters: [userParam?.id],
    responses: {
      200: Success,
    },
  },
};
