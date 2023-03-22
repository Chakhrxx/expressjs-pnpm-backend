export const swaggerUserSchema = {
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
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password",
    role: "guest",
  },
};
