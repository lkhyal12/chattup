import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllChats,
  getAllContactS,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/messages.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

router.use(arcjetProtection, protectRoute);
router.get("/contacts", getAllContactS);
router.get("/chats", getAllChats);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);
// router.get("/send", (req, res) => {
//   res.send("send message endpoint");
// });

export default router;
