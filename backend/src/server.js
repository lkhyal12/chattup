import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.route.js";
const app = express();
dotenv.config();
app.use(express.json());

// auth router
app.use("/api/auth", authRouter);
const __dirname = path.resolve();
// messages router
app.use("/api/messages", messagesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  });
}
app.listen(process.env.PORT || 3000, () =>
  console.log("server is running now on port", process.env.PORT || 3000),
);
