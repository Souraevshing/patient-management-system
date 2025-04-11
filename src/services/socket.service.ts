import type { Server, Socket } from "socket.io";
import patientStore from "../models/PatientStore.js";

let io: Server | null = null;

// Initialize Socket.io
export const initSocketIO = (socketIo: Server): void => {
  io = socketIo;

  io.on("connection", (socket: Socket) => {
    console.log("Client connected");

    // Send current queue to new connections
    socket.emit("queueUpdate", patientStore.getQueuedPatients());

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

// Emit an event to all connected clients
export const emitEvent = <T>(event: string, data: T): void => {
  if (io) {
    io.emit(event, data);
  }
};
