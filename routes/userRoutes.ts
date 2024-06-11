import express from "express";
import { fetchUser, updateUser } from "../controller/userApi";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/fetch-user-data", authMiddleware, fetchUser);
router.post("/update-user-data", authMiddleware, updateUser);

export default router;
