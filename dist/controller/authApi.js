"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const ApiError_1 = require("../entities/ApiError");
const authCollection_1 = require("../repository/authCollection");
const login = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res, next } = params;
    const { email, password } = req.body;
    try {
        const userCredential = yield (0, authCollection_1.signIn)(email, password);
        const user = userCredential.user;
        if (!user) {
            throw new ApiError_1.ApiError("Invalid login credentials", 401);
        }
        const token = yield (0, authCollection_1.createToken)(user.uid);
        res.status(200).json({ token });
    }
    catch (error) {
        next(new ApiError_1.ApiError("Failed to login user", 401));
    }
});
exports.login = login;
const register = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res, next } = params;
    const { email, password } = req.body;
    try {
        const userCredential = yield (0, authCollection_1.signUp)(email, password);
        const user = userCredential.user;
        if (!user) {
            throw new ApiError_1.ApiError("Failed to register user", 500);
        }
        const token = yield (0, authCollection_1.createToken)(user.uid);
        res.status(201).json({ token });
    }
    catch (error) {
        next(new ApiError_1.ApiError("Failed to register user", 500));
    }
});
exports.register = register;
const logout = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res, next } = params;
    try {
        yield (0, authCollection_1.signOut)();
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        next(new ApiError_1.ApiError("Failed to logout user", 500));
    }
});
exports.logout = logout;
