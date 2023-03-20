import { Express } from "express";
import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { userAPI, userAPIbyParam } from "./user";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Nodejs-pnpm API",
    version: "1-alpine",
    description: "API for ExpressJS TypeScipt",
  },
  components: {
    securitySchemes: {
      // BasicAuth: {
      //   type: "http",
      //   scheme: "basic",
      // },
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Enter your JWT token in the format `Bearer &lt;token&gt;`",
        name: "Authorization",
        in: "header",
      },
      // ApiKeyAuth: {
      //   type: "apiKey",
      //   in: "header",
      //   name: "X-API-Key",
      // },
      // OAuth2: {
      //   type: "oauth2",
      //   flows: {
      //     authorizationCode: {
      //       authorizationUrl: "https://example.com/oauth/authorize",
      //       tokenUrl: "https://example.com/oauth/token",
      //       scopes: {
      //         read: "Grants read access",
      //         write: "Grants write access",
      //         admin: "Grants access to admin operations",
      //       },
      //     },
      //   },
      // },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    "/creatAuth/{id}": {
      post: {
        summary: "Creates a user.",
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
          201: {
            description: "Created",
          },
        },
      },
    },
    "/api/user": userAPI,
    "/api/user/{id}": userAPIbyParam,
  },
};

const options = {
  swaggerDefinition,
  apis: ["../routes/api/*.ts"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
