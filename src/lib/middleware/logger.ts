import { Application, NextFunction, Request, Response } from "express";
import logger from "../logger";

/**
 * Initializes the logger middleware for the Express application.
 * This middleware logs incoming requests and their details, including method, endpoint, query, params, and body.
 * It also profiles the request duration and logs the response status code.
 * @param app - The Express application.
 */
const inItLogger = (app: Application) => {
  /**
   * Middleware function to log request details and profile request duration.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function in the Express application.
   */
  const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Log request details
    const requestInfo = {
      method: req.method,
      endpoint: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    };

    // Start profiling the request
    const profiler = logger?.startTimer();

    // Log the incoming request
    logger?.info(`Incoming RequestInfo ${JSON.stringify(requestInfo)}`);

    // Add a listener for the 'finish' event, which is emitted when the response has been sent
    res.once("finish", () => {
      profiler?.done({
        returnedStatusCode: res.statusCode,
        requestInfo,
        message: `Request to ${req.originalUrl} completed`, // Add a meaningful message
      });
    });

    // Continue with the request handling
    next();
  };
  app.use(requestLogger);
};

export default inItLogger;
