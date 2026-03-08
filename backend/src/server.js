import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.route.js";
import { connectToMongo } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// auth router
app.use("/api/auth", authRouter);
const __dirname = path.resolve();
// messages router
app.use("/api/messages", messagesRouter);
app.use("/", (req, res) => {
  res.send("hello welcome");
});
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
//   });
// }
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running now on port", process.env.PORT || 3000);
  connectToMongo();
});
