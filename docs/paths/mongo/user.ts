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
    summary: "Create a Mongo user",
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
    summary: "Returns a user",
    tags: ["MongoDB"],
    parameters: [userParam?.id],
    responses: {
      200: Success,
    },
  },
  put: {
    summary: "Update a Mongo user",
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
    summary: "Delete a Mongo user",
    tags: ["MongoDB"],
    parameters: [userParam?.id],
    responses: {
      200: Success,
    },
  },
};
