import User from "../models/User.js";
import { ENV } from "../lib/env.js";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    console.log(socket.handshake.headers);
    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }
    const user = await User.findById(decoded.userId).select("-password");
    console.log(decoded);
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();
    console.log({ user });
    next();
  } catch (err) {
    console.log("Error in socket authentication:", err.message);
    return next(new Error("Unauthorized - Authentication failed"));
  }
};
