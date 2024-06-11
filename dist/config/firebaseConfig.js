"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = exports.admin = void 0;
const app_1 = require("firebase/app");
const app_2 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const auth_1 = require("firebase/auth");
const serviceAccount = require("../ebuddy-dc818-firebase-adminsdk-cosd6-0a97ad4559.json");
(0, app_2.initializeApp)({
    credential: (0, app_2.cert)(serviceAccount),
});
const firebaseConfig = {
    apiKey: "AIzaSyAufG9bBLVN2_-AVGEWoA44jVy5EVDjkhY",
    authDomain: "ebuddy-dc818.firebaseapp.com",
    projectId: "ebuddy-dc818",
    storageBucket: "ebuddy-dc818.appspot.com",
    messagingSenderId: "68729869590",
    appId: "1:68729869590:web:8165f307e1ef4119066c37",
    measurementId: "G-P6XM9Z80BN",
};
if (!(0, app_1.getApps)().length) {
    (0, app_1.initializeApp)(firebaseConfig);
}
const auth = (0, auth_1.getAuth)((0, app_1.getApp)());
exports.auth = auth;
const db = (0, firestore_1.getFirestore)();
exports.db = db;
