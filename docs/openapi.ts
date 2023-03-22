import { Express } from "express";
import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Import Path Documentation
import { creatTokenAPI } from "./paths/default";
import { mongoUserAPI, mongoUserAPIbyParam } from "./paths/mongo/user";
import { postgresUserAPI, postgresUserAPIbyParam } from "./paths/postgres/user";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Nodejs-pnpm API",
    version: "1-alpine",
    description: "API for ExpressJS TypeScipt",
  },
  basePath: "/",
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
    "/creatToken/{id}": creatTokenAPI,
    "/mongo/user": mongoUserAPI,
    "/mongo/user/{id}": mongoUserAPIbyParam,
    "/postgres/user": postgresUserAPI,
    "/postgres/user/{id}": postgresUserAPIbyParam,
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
