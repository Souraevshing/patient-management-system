import swaggerJSDoc from "swagger-jsdoc"

import version from "../../package.json" with { type: "json" }

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {

      title: "Patient Management API",
      version: version.version,
      description: "API for managing patient queues in an emergency room setting",
      license: {
        name: "ISC",
      },
      contact: {
        name: "Sourav",
        email:"isauravshing@gmail.com",
        url: "https://github.com/Souraevshing/patient-management-system.git",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
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
          required: ["id", "name", "condition", "triageLevel", "arrivalTime", "status"],
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the patient",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            name: {
              type: "string",
              description: "Patient name",
              example: "John Doe",
            },
            condition: {
              type: "string",
              description: "Medical condition",
              example: "Chest pain",
            },
            triageLevel: {
              type: "integer",
              description: "Triage level (1-5, where 1 is most critical)",
              minimum: 1,
              maximum: 5,
              example: 2,
            },
            arrivalTime: {
              type: "integer",
              description: "Timestamp of arrival (milliseconds since epoch)",
              example: 1609459200000,
            },
            status: {
              type: "string",
              enum: ["waiting", "being treated", "discharged"],
              description: "Current status of the patient",
              example: "waiting",
            },
            estimatedWaitTime: {
              type: "integer",
              description: "Estimated wait time in milliseconds",
              example: 600000,
            },
            treatmentStartTime: {
              type: "integer",
              description: "Timestamp when treatment started (if applicable)",
              example: 1609459800000,
            },
            dischargeTime: {
              type: "integer",
              description: "Timestamp when discharged (if applicable)",
              example: 1609463400000,
            },
          },
        },
        PatientInput: {
          type: "object",
          required: ["name", "condition", "triageLevel"],
          properties: {
            name: {
              type: "string",
              description: "Patient name",
              example: "John Doe",
            },
            condition: {
              type: "string",
              description: "Medical condition",
              example: "Chest pain",
            },
            triageLevel: {
              type: "integer",
              description: "Triage level (1-5, where 1 is most critical)",
              minimum: 1,
              maximum: 5,
              example: 2,
            },
          },
        },
        Statistics: {
          type: "object",
          properties: {
            waitingCount: {
              type: "integer",
              description: "Number of patients waiting",
              example: 5,
            },
            treatingCount: {
              type: "integer",
              description: "Number of patients being treated",
              example: 3,
            },
            dischargedCount: {
              type: "integer",
              description: "Number of patients discharged",
              example: 10,
            },
            staffCount: {
              type: "integer",
              description: "Number of staff members",
              example: 3,
            },
            patientToStaffRatio: {
              type: "number",
              format: "float",
              description: "Ratio of patients to staff",
              example: 2.67,
            },
            thresholdExceeded: {
              type: "boolean",
              description: "Whether the patient-to-staff ratio exceeds safe levels",
              example: false,
            },
          },
        },
        StaffCountUpdate: {
          type: "object",
          required: ["count"],
          properties: {
            count: {
              type: "integer",
              description: "Number of staff members",
              minimum: 1,
              example: 5,
            },
          },
        },
        SimulationOptions: {
          type: "object",
          properties: {
            duration: {
              type: "integer",
              description: "Simulation duration in minutes",
              example: 60,
            },
            patientsPerMinute: {
              type: "number",
              description: "Average number of patients to generate per minute",
              example: 1,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
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
              example: ["Name is required", "Triage level must be an integer between 1 and 5"],
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
  },
  apis: ["./src/**/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
