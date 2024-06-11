import express from "express";
import { login, logout, register } from "../controller/authApi";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/sign-in", login);
router.post("/sign-up", register);
router.post("/sign-out", authMiddleware, logout);

export default router;
