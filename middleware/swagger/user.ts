export const userAPI = {
  get: {
    summary: "Returns a list of users",
    tags: ["User"],
    responses: {
      200: {
        description: "OK",
      },
    },
  },
  post: {
    summary: "Creates a user.",
    tags: ["User"],
    requestBody: {
      required: ["username", "password", "email", "role"],
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                description: "username",
              },
              password: {
                type: "string",
                description: "password",
              },
              email: {
                type: "string",
                description: "email",
              },
              role: {
                type: "string",
                description: "role",
              },
            },
            example: {
              // userId: "60d5b2f65e32c10b09e9427e",
              email: "john.doe@example.com",
              name: "John Doe",
              password: "password",
              role: "guest",
            },
          },
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

export const userAPIbyParam = {
  get: {
    summary: "Returns a list of users",
    tags: ["User"],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of user to return",
        required: true,
        schema: {
          type: "string",
        },
        example: "60d5b2f65e32c10b09e9427e",
      },
    ],
    responses: {
      200: {
        description: "OK",
      },
    },
  },
  put: {
    summary: "Returns a list of users",
    tags: ["User"],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of user to return",
        required: true,
        schema: {
          type: "string",
        },
        example: "60d5b2f65e32c10b09e9427e",
      },
    ],
    requestBody: {
      required: ["username", "password", "email", "role"],
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                description: "username",
              },
              password: {
                type: "string",
                description: "password",
              },
              email: {
                type: "string",
                description: "email",
              },
              role: {
                type: "string",
                description: "role",
              },
            },
            example: {
              // userId: "60d5b2f65e32c10b09e9427e",
              email: "john.doe@example.com",
              name: "John Doe",
              password: "password",
              role: "guest",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "OK",
      },
    },
  },
  delete: {
    summary: "Returns a list of users",
    tags: ["User"],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of user to return",
        required: true,
        schema: {
          type: "string",
        },
        example: "60d5b2f65e32c10b09e9427e",
      },
    ],
    responses: {
      200: {
        description: "OK",
      },
    },
  },
};
