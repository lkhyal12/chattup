import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.route.js";
import { connectToMongo } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { arcjetProtection } from "./middleware/arcjet.middleware.js";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.io.js";

dotenv.config();

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);
// auth router
app.use("/api/auth", authRouter);
const __dirname = path.resolve();
// messages router
app.use("/api/messages", messagesRouter);
// app.get("/protected", arcjetProtection, (req, res) => {
// res.send({ message: "welcome home" });
// });
// if (process.env.NODE_ENV === "production") {
app.use("/", (req, res) => {
  res.send("hello welcome");
});
//   app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
//   });
// }

server.listen(process.env.PORT || 3000, () => {
  console.log("server is running now on port", process.env.PORT || 3000);
  connectToMongo();
});
