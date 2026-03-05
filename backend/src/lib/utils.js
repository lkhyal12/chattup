import jwt from "jsonwebtoken";

export function generateToken(userId, res) {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? false : true,
  });
  return token;
}
