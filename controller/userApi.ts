import { Request, Response } from "express";
import { ApiError, ApiSuccess } from "../entities";
import { getUserById, updateUserById } from "../repository/userCollection";

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
      return res.status(404).json(new ApiError("User not found", 404).get());
    }

    return res
      .status(200)
      .json(new ApiSuccess(200, "Fetch User Success", userDoc).get());
  } catch (error: any) {
    return res
      .status(500)
      .json(new ApiError(error.message || "Failed to fetch user", 500).get());
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
          new ApiError("Full Name or Phone Number Can't be null", 500).get()
        );
    }

    if (!isExist) {
      return res.status(404).json(new ApiError("User not found", 404).get());
    }
    await updateUserById(userId, {
      fullName,
      phoneNumber,
    });
    return res
      .status(200)
      .json(new ApiSuccess(200, "User updated successfully", {}).get());
  } catch (error: any) {
    return res
      .status(500)
      .json(new ApiError(error.message || "Failed to update user", 500).get());
  }
};
