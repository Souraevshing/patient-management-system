import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { initSocketIO } from "./services/socket.service.js";

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server);
initSocketIO(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
