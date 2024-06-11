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
exports.updateUser = exports.fetchUser = void 0;
const userCollection_1 = require("../repository/userCollection");
const ApiError_1 = require("../entities/ApiError");
const isUserExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = yield (0, userCollection_1.getUserById)(id);
    if (!userDoc.exists)
        return {
            isExist: false,
            userDoc: null,
        };
    return {
        isExist: true,
        userDoc,
    };
});
const fetchUser = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res, next } = props;
    try {
        const { id } = req.params;
        const { isExist, userDoc } = yield isUserExist(id);
        if (!isExist)
            throw new ApiError_1.ApiError("User not found", 404);
        if (userDoc)
            res.status(200).json(userDoc.data());
    }
    catch (error) {
        next(new ApiError_1.ApiError("Failed to fetch user", 500));
    }
});
exports.fetchUser = fetchUser;
const updateUser = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, res, next } = props;
    try {
        const { id, data } = req.body;
        const { isExist } = yield isUserExist(id);
        if (!isExist)
            throw new ApiError_1.ApiError("User not found", 404);
        yield (0, userCollection_1.updateUserById)(id, data);
        res.status(200).send("User updated successfully");
    }
    catch (error) {
        next(new ApiError_1.ApiError("Failed to update user", 500));
    }
});
exports.updateUser = updateUser;
