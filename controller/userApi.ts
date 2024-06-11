import { getUserById, updateUserById } from "../repository/userCollection";
import { ApiError } from "../entities";
import { Request, Response } from "express";

const isUserExist = async (
  uid: string
): Promise<
  | {
      isExist: boolean;
      userDoc: null;
    }
  | {
      isExist: boolean;
      userDoc: FirebaseFirestore.DocumentData;
    }
> => {
  const userDoc: FirebaseFirestore.DocumentData = await getUserById(uid);

  if (!userDoc.uid)
    return {
      isExist: false,
      userDoc: null,
    };
  return {
    isExist: true,
    userDoc,
  };
};

export const fetchUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const session = (req as any).session;
    const { isExist, userDoc } = await isUserExist(session.userData.uid);

    if (!isExist) {
      return res.status(404).json(new ApiError("User not found", 404).result());
    }
    return res.status(200).json(userDoc);
  } catch (error: any) {
    return res
      .status(500)
      .json(
        new ApiError(error.message || "Failed to fetch user", 500).result()
      );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const session = (req as any).session;
    const userId = session.userData.uid;
    const { fullName, phoneNumber } = req.body;
    const { isExist } = await isUserExist(userId);

    if (!fullName || !phoneNumber) {
      return res
        .status(500)
        .json(
          new ApiError("Full Name or Phone Number Can't be null", 500).result()
        );
    }

    if (!isExist) {
      return res.status(404).json(new ApiError("User not found", 404).result());
    }
    await updateUserById(userId, {
      fullName,
      phoneNumber,
    });
    return res
      .status(200)
      .json({ status: 200, message: "User updated successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json(
        new ApiError(error.message || "Failed to update user", 500).result()
      );
  }
};
