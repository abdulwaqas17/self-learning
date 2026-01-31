import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerTags } from "./tags.js";
import { userSchemas } from "./schemas/user.schema.js";
import { authSchemas } from "./schemas/auth.schema.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hospital Management API",
      version: "1.0.0",
    },
    tags : swaggerTags,
    servers: [
  {
    url: "http://localhost:5000/api",
    description: "Local",
  },
  {
    url: "https://api.myapp.com",
    description: "Production",
  },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...userSchemas,...authSchemas
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiHandler = swaggerUi;