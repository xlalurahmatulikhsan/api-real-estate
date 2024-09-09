import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addChat,
  getChat,
  getChats,
  hardDeleteChat,
  readChat,
  softDeleteChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);
router.delete("/soft/:id", verifyToken, softDeleteChat);
router.delete("/hard/:id", hardDeleteChat);

export default router;
