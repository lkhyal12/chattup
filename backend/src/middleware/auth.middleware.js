import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";
export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token was provided" });
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User Not Found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect route middleware ", error);
    res.status(500).json({ message: "Inetrnal server error" });
  }
}
