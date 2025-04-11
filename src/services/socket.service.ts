import type { Server, Socket } from "socket.io";

import patientStore from "../models/patient-store.model.js";

let io: Server | null = null;

export const initSocketIO = (socketIo: Server): void => {
  io = socketIo;

  io.on("connection", (socket: Socket) => {
    console.log("Client connected");

    socket.emit("queueUpdate", patientStore.getQueuedPatients());

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export const emitEvent = <T>(event: string, data: T): void => {
  if (io) {
    io.emit(event, data);
  }
};
