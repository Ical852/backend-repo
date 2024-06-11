"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const routes_1 = require("../routes");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/users", routes_1.userRoutes);
app.use("/auth", routes_1.authRoutes);
// Error Handler
app.use((params) => {
    const { err, res } = params;
    res.status(err.statusCode || 500).json({ message: err.message });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
