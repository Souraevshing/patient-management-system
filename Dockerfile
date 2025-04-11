# Dockerfile
FROM node:22-alpine/node

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/server.js"]