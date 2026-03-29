import express from "express";
import http from "http";
import { ENV } from "./env.js";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});
// apply authentication to all socket connections
io.use(socketAuthMiddleware);

// this is for storing online users
const userSocketMap = {};
console.log(userSocketMap);
io.on("connection", (socket) => {
  console.log(socket);
  console.log("A user connected ", socket.user.fullName);
  const userId = socket.user.id;
  userSocketMap[userId] = socket.id;

  // io.emit is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
