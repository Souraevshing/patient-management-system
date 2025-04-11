# Patient Management API

A RESTful API service that simulates the management of patient queues in an emergency room setting. This system implements a priority queue based on triage levels and wait times, with real-time notifications for critical events.

## Project Structure

\`\`\`
/
├── src/
│   ├── controllers/    # Handle request/response logic
│   ├── models/         # Data models and business logic
│   ├── routes/         # Route definitions
│   ├── middlewares/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── services/       # Business logic services
│   ├── config/         # Configuration files
│   ├── types/          # TypeScript type definitions
│   ├── app.ts          # Main application file
│   └── index.ts       # Server startup file
├── tests/              # Test files
├── dist/               # Compiled JavaScript files
├── tsconfig.json       # TypeScript configuration
|-- nodemon.json        # nodemon configuration to run app in development mode
└── package.json        # Project metadata
\`\`\`

## Features

- Priority queue system based on triage levels (1-5) and wait times
- Real-time notifications for critical patients and staffing thresholds
- Wait time estimates for patients
- Simulation mode for testing system performance
- Authentication and rate limiting
- TypeScript for type safety

## API Endpoints

### Patient Management

#### Add a patient to the queue

\`\`\`
POST /patients
\`\`\`
Request body:
\`\`\`json
{
  "name": "John Doe",
  "condition": "Chest pain",
  "triageLevel": 2
}
\`\`\`

- `name`: Patient name (required)
- `condition`: Medical condition (required)
- `triageLevel`: Integer from 1-5, where 1 is most critical (required)

#### Get the current queue

\`\`\`
GET /patients
\`\`\`
Returns an array of patients in the queue with their details and estimated wait times.

#### Move a patient to "being treated" status

\`\`\`
PUT /patients/:id/treat
\`\`\`
Moves the specified patient from the waiting queue to being treated.

#### Discharge a patient

\`\`\`
PUT /patients/:id/discharge
\`\`\`
Marks the specified patient as discharged.

### Statistics and Simulation

#### Get system statistics

\`\`\`
GET /stats
\`\`\`
Returns statistics about the current state of the ER.

#### Update staff count

\`\`\`
PUT /stats/staff
\`\`\`
Request body:
\`\`\`json
{
  "count": 5
}
\`\`\`
Updates the number of staff members available.

#### Start simulation mode

\`\`\`
POST /simulation/start
\`\`\`
Request body:
\`\`\`json
{
  "duration": 60,
  "patientsPerMinute": 1
}
\`\`\`

- `duration`: Simulation duration in minutes (default: 60)
- `patientsPerMinute`: Average number of patients to generate per minute (default: 1)

#### Stop simulation mode

\`\`\`
POST /simulation/stop
\`\`\`
Stops an ongoing simulation.

## API Documentation

The API is documented using Swagger/OpenAPI. You can access the interactive documentation at:

\`\`\`
<http://localhost:3000/api-docs>
\`\`\`

This provides a user-friendly interface to:

- Explore available endpoints
- View request/response schemas
- Test API calls directly from the browser
- Understand authentication requirements

## Real-time Notifications

The API uses Socket.io for real-time notifications. Connect to the WebSocket endpoint to receive the following events:

- `queueUpdate`: Sent when the queue changes
- `criticalPatient`: Sent when a critical patient (triage level 1) arrives
- `waitTimeUpdates`: Sent when wait time estimates are updated
- `staffingThresholdExceeded`: Sent when the patient-to-staff ratio exceeds safe levels
- `staffingNormalized`: Sent when the patient-to-staff ratio returns to safe levels
- `patientTreating`: Sent when a patient begins treatment
- `patientDischarged`: Sent when a patient is discharged
- `simulationEnded`: Sent when a simulation ends

## Authentication

All API endpoints require authentication using a Bearer token:

\`\`\`
Authorization: Bearer er-api-token
\`\`\`

## Rate Limiting

The API implements rate limiting to prevent abuse. Each IP address is limited to 100 requests per 15-minute window.

## Running the Application

1. Install dependencies:
\`\`\`
npm install
\`\`\`

2. Build the TypeScript code:
\`\`\`
npm run build
\`\`\`

3. Start the server:
\`\`\`
npm start
\`\`\`

4. For development with auto-restart:
\`\`\`
npm run dev
\`\`\`

## Running Tests

\`\`\`
npm test
\`\`\`

## Technical Implementation

- Node.js with Express
- TypeScript for type safety
- Socket.io for real-time notifications
- Custom priority queue implementation
- In-memory data store
- Authentication middleware
- Rate limiting middleware
