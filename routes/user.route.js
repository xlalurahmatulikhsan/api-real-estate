import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/search/:id', verifyToken, getUser);
router.get('/:id', verifyToken, updateUser);
router.get('/:id', verifyToken, deleteUser);

export default router;