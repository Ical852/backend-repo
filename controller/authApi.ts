import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

import {
  signIn,
  signUp,
  signOut,
  verifyToken,
  userStore,
} from "../repository/authCollection";
import { getUserById } from "../repository/userCollection";
import { ApiError, UserModel } from "../entities";

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
        .json(new ApiError("Invalid login credentials", 401).result());
    }

    const token = await user.getIdToken();
    const userData = await getUserById(user.uid);

    return res.status(200).json({ token, ...userData });
  } catch (error: any) {
    res
      .status(401)
      .json(
        new ApiError(error.message || "Failed to login user", 401).result()
      );
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
        .json(new ApiError("Fill yout Full Name & Phone Number", 500).result());
    }

    const userCredential = await signUp(email, password);
    const user = userCredential.user;

    if (!user) {
      return res
        .status(500)
        .json(new ApiError("Failed to register user", 500).result());
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

    return res.status(201).json(signedUp);
  } catch (error: any) {
    return res
      .status(500)
      .json(
        new ApiError(error.message || "Failed to register user", 500).result()
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
      return res.status(200).json({ message: "User logged out successfully" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json(
        new ApiError(error.message || "Failed to logout user", 500).result()
      );
  }
};
