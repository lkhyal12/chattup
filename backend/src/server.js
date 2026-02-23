import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.route.js";
const app = express();
dotenv.config();
app.get("/", (req, res) => {
  res.send("weolcome ");
});
// auth router
app.use("/api/auth", authRouter);

// messages router
app.use("/api/messages", messagesRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log("server is running now on port", process.env.PORT || 3000),
);
