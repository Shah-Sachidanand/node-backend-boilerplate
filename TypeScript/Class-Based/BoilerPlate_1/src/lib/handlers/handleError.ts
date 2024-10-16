import { Response } from "express";
import { MongoServerError } from "mongodb";
import { StatusCodes } from "../utils/statusCodes";
import { ErrorResponse } from "../../@types";

/**
 * Generates an error response
 * @param res - Express response object
 * @param err - Error object
 */
const generateErrorResponse = (res: Response, err: ErrorResponse): void => {
  res.status(err?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err?.message || "An unhandled error occurred.",
    moreInfo: err?.moreInfo || "No additional info found.",
  });
};

/**
 * Handles MongoDB errors and sends appropriate responses
 * @param res - Express response object
 * @param error - Error object
 */
const handleMongoError = (res: Response, error: MongoServerError): void => {
  switch (error.code) {
    case 11000:
      // Duplicate key error
      generateErrorResponse(res, {
        code: StatusCodes.CONFLICT,
        message: "Duplicate key error: Resource already exists",
        moreInfo: error,
      });
      break;
    case 121:
      // Document validation error
      generateErrorResponse(res, {
        code: StatusCodes.BAD_REQUEST,
        message: "Document validation error",
        moreInfo: error,
      });
      break;
    // Add other MongoDB error codes as needed
    default:
      // Generic MongoDB error
      generateErrorResponse(res, {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "An internal MongoDB error occurred",
        moreInfo: error,
      });
      break;
  }
};

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param res - Express response object
 * @param err - Error object
 */
const handleError = (
  res: Response,
  err: ErrorResponse | MongoServerError
): void => {
  // Logs error to the console in development or other non-test environments
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  // Check if the error is a MongoServerError
  if (err instanceof MongoServerError) {
    handleMongoError(res, err);
  } else {
    // Sends generic error to user
    try {
      generateErrorResponse(res, err);
    } catch (error: unknown) {
      console.error(error);

      const fallbackError: ErrorResponse = {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error ? error.message : "An unknown error occurred.",
        moreInfo: "An error occurred while handling another error.",
      };

      generateErrorResponse(res, fallbackError);
    }
  }
};

export { handleError, generateErrorResponse };
