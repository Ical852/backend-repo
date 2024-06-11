"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userApi_1 = require("../controller/userApi");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/fetch-user-data/:id", authMiddleware_1.authMiddleware, userApi_1.fetchUser);
router.put("/update-user-data", authMiddleware_1.authMiddleware, userApi_1.updateUser);
exports.default = router;
