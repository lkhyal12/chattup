import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export async function arcjetProtection(req, res, next) {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded please try again later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot Access Denied" });
      } else {
        return res
          .status(403)
          .json({ message: "access denied by security policy" });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed Bot Detected",
        message: "Malicious bot activity detected",
      });
    }
    next();
  } catch (error) {
    console.log("Arcjet error ", error);
    next();
  }
}
