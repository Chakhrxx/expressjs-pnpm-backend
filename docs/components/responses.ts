export const Success = {
  description: "OK",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "Success",
          },
          result: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "name",
              },
              email: {
                type: "string",
                description: "email",
              },
            },
          },
        },
      },
    },
  },
};
