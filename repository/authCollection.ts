import { admin, auth } from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";
import { UserModel } from "../entities/UserModel";

export const verifyToken = async (token: string) => {
  return await admin.auth().verifyIdToken(token);
};

export const signIn = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const storeSession = async (uid: string, token: string) => {
  await db.collection("SESSION").add({ uid, token });
};

export const createToken = async (uid: string) => {
  return await admin.auth().createCustomToken(uid);
};

export const signUp = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const userStore = async (params: UserModel) => {
  return await db.collection("USERS").add(params.get());
};

export const signOut = async (uid: string, token: string) => {
  const id = (
    await db
      .collection("SESSION")
      .where("uid", "==", uid)
      .where("token", "==", token)
      .limit(1)
      .get()
  ).docs[0].id;

  await db.collection("SESSION").doc(id).delete();
  return await admin.auth().revokeRefreshTokens(uid);
};

export const revokeSession = async (uid: string) => {
  const id = (
    await db.collection("SESSION").where("uid", "==", uid).limit(1).get()
  ).docs[0].id;

  await db.collection("SESSION").doc(id).delete();
};

export const isSignedIn = async (uid: string) => {
  const get = await db
    .collection("SESSION")
    .where("uid", "==", uid)
    .limit(1)
    .get();

  return !get.empty;
};

export const isExpired = async (uid: string, token: string) => {
  const get = await db
    .collection("SESSION")
    .where("uid", "==", uid)
    .where("token", "==", token)
    .limit(1)
    .get();

  return get.empty;
};
