import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Patient Management API",
    version: "1.0.0",
    description: "API for managing patient queues in an emergency room setting",
    license: {
      name: "ISC",
    },
    contact: {
      name: "Sourav",
      email: "isauravshing@gmail.com",
      url: "https://github.com/Souraevshing/patient-management-system.git",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
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
      Patient: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          condition: {
            type: "string",
            example: "Chest pain",
          },
          triageLevel: {
            type: "integer",
            example: 2,
          },
          arrivalTime: {
            type: "integer",
            example: 1609459200000,
          },
          status: {
            type: "string",
            example: "waiting",
          },
          estimatedWaitTime: {
            type: "integer",
            example: 600000,
          },
        },
      },
      PatientInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          condition: {
            type: "string",
            example: "Chest pain",
          },
          triageLevel: {
            type: "integer",
            example: 2,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Something went wrong",
          },
        },
      },

      ValidationError: {
        type: "object",
        properties: {
          errors: {
            type: "array",
            items: {
              type: "string",
            },
            description: "List of validation errors",
            example: [
              "Name is required",
              "Triage level must be an integer between 1 and 5",
            ],
          },
        },
      },
      TokenRequest: {
        type: "object",
        properties: {
          username: {
            type: "string",
            example: "admin",
          },
          password: {
            type: "string",
            example: "password",
          },
        },
      },
      TokenResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9...",
          },
          expiresIn: {
            type: "string",
            example: "24h",
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
