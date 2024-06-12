import { NextFunction, Response, Request } from "express";
import { IncomingHttpHeaders } from "http";

import { ApiError } from "../entities";
import { verifyToken, isExpired } from "../repository/authCollection";

export const authMiddleware = async (
  req: Request & { headers: IncomingHttpHeaders },
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json(new ApiError("Unauthorized", 401).get());
  }

  try {
    const decodedToken = await verifyToken(token);
    const isInvalid = await isExpired(decodedToken.uid, token);
    if (token && isInvalid) {
      return res.status(401).json(new ApiError("Token Invalid", 401).get());
    }

    (req as any).session = {
      token: token,
      userData: decodedToken,
    };
    next();
  } catch (error: any) {
    return res
      .status(401)
      .json(new ApiError(error.message || "Unauthorized", 401).get());
  }
};
