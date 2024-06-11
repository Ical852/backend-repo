import { db } from "../config/firebaseConfig";
import { UpdateParams } from "../types/routes/user";

export const getUserById = async (uid: string) => {
  return (
    await db.collection("USERS").where("uid", "==", uid).limit(1).get()
  ).docs[0].data();
};

export const updateUserById = async (uid: string, update: UpdateParams) => {
  const id = (
    await db.collection("USERS").where("uid", "==", uid).limit(1).get()
  ).docs[0].id;

  return await db.collection("USERS").doc(id).update(update);
};
