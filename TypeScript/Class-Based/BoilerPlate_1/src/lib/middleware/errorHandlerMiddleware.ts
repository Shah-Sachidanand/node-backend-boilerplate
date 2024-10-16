import { Request, Response, NextFunction } from "express";
import { handleError } from "../handlers/handleError";
import { MongoServerError } from "mongodb";
import { ErrorResponse } from "../../@types";

/**
 * Middleware to handle errors in the application.
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function in the middleware chain.
 */
const errorHandlerMiddleware = (
  err: ErrorResponse | MongoServerError, // Adjust type if necessary
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Pass the error to the handleError function
  handleError(res, err);
};

export default errorHandlerMiddleware;
