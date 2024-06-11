import { Request, Response, NextFunction } from "express";

export interface ErrorHandlerParams {
  err: any;
  req: Request;
  res: Response;
  next: NextFunction;
}
