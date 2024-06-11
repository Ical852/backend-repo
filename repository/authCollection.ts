import { admin, auth } from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";
import { UserModel } from "../entities/UserModel";

export const verifyToken = async (token: string) => {
  return await admin.auth().verifyIdToken(token);
};

export const signIn = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const createToken = async (uid: string) => {
  return await admin.auth().createCustomToken(uid);
};

export const signUp = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const userStore = async (params: UserModel) => {
  return await db.collection("USERS").add(params.init());
};

export const signOut = async (uid: string, token: string) => {
  await db.collection("EXPSESSION").add({ uid, token });
  return await admin.auth().revokeRefreshTokens(uid);
};

export const isExpired = async (uid: string, token: string) => {
  const get = await db
    .collection("EXPSESSION")
    .where("uid", "==", uid)
    .where("token", "==", token)
    .limit(1)
    .get();

  return !get.empty;
};
