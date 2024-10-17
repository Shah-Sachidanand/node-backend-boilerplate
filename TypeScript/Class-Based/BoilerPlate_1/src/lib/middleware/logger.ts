import { Application, NextFunction, Request, Response } from "express";
import logger from "../logger";

const inItLogger = (app: Application) => {
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
