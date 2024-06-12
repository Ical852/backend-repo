import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

import {
  signIn,
  signUp,
  signOut,
  verifyToken,
  userStore,
  storeSession,
  isSignedIn,
  revokeSession,
} from "../repository/authCollection";
import { getUserById } from "../repository/userCollection";
import { ApiError, ApiSuccess, UserModel } from "../entities";

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { email, password } = req.body;

  try {
    const userCredential = await signIn(email, password);
    const user = userCredential.user;

    if (!user) {
      return res
        .status(401)
        .json(new ApiError("Invalid login credentials", 401).get());
    }

    const signedIn = await isSignedIn(user.uid);
    if (signedIn) await revokeSession(user.uid);

    const token = await user.getIdToken();
    const userData = await getUserById(user.uid);
    await storeSession(user.uid, token);

    return res
      .status(200)
      .json(new ApiSuccess(200, "Login Success", { token, ...userData }).get());
  } catch (error: any) {
    res
      .status(401)
      .json(new ApiError(error.message || "Failed to login user", 401).get());
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { email, password, fullName, phoneNumber } = req.body;

  try {
    if (!fullName || !phoneNumber) {
      return res
        .status(500)
        .json(new ApiError("Fill yout Full Name & Phone Number", 500).get());
    }

    const userCredential = await signUp(email, password);
    const user = userCredential.user;

    if (!user) {
      return res
        .status(500)
        .json(new ApiError("Failed to register user", 500).get());
    }

    const token = await user.getIdToken();
    const signedUp = new UserModel(
      token,
      email,
      fullName,
      phoneNumber,
      user.uid
    );
    await userStore(signedUp);
    await storeSession(signedUp.uid, token);

    return res
      .status(201)
      .json(new ApiSuccess(201, "Register Success", signedUp).get());
  } catch (error: any) {
    return res
      .status(500)
      .json(
        new ApiError(error.message || "Failed to register user", 500).get()
      );
  }
};

export const logout = async (
  req: Request & { headers: IncomingHttpHeaders },
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      const decodedToken = await verifyToken(token);
      await signOut(decodedToken.uid, token);
      return res
        .status(200)
        .json(new ApiSuccess(200, "User logged out successfully", {}).get());
    }
  } catch (error: any) {
    return res
      .status(500)
      .json(new ApiError(error.message || "Failed to logout user", 500).get());
  }
};
