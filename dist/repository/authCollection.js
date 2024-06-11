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
exports.signOut = exports.signUp = exports.createToken = exports.signIn = exports.verifyToken = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebaseConfig_1.admin.auth().verifyIdToken(token);
});
exports.verifyToken = verifyToken;
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebaseConfig_1.auth.signInWithEmailAndPassword(email, password);
});
exports.signIn = signIn;
const createToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebaseConfig_1.admin.auth().createCustomToken(user.uid);
});
exports.createToken = createToken;
const signUp = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebaseConfig_1.auth.createUserWithEmailAndPassword(email, password);
});
exports.signUp = signUp;
const signOut = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebaseConfig_1.auth.signOut();
});
exports.signOut = signOut;
