import { Success } from "../../components/responses";
import { userParam } from "../../components/parameter";
import { swaggerUserSchema } from "../../components/schema";

export const postgresUserAPI = {
  get: {
    summary: "Returns a list of users",
    tags: ["PostgresDB"],
    responses: {
      200: Success,
    },
  },
  post: {
    summary: "Create a Postgres user",
    tags: ["PostgresDB"],
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

export const postgresUserAPIbyParam = {
  get: {
    summary: "Returns a user",
    tags: ["PostgresDB"],
    parameters: [userParam?.id],
    responses: {
      200: Success,
    },
  },
  put: {
    summary: "Update a Postgres user",
    tags: ["PostgresDB"],
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
    summary: "Delete a Postgres user",
    tags: ["PostgresDB"],
    parameters: [userParam?.id],
    responses: {
      200: Success,
    },
  },
};
