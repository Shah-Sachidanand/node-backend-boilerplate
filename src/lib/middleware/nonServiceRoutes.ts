import { Application, Request, Response, Router } from "express";
import buildError from "../utils/buildError";
import { StatusCodes } from "../utils/statusCodes";
import isBrowser from "../utils/isBrowser";
import buildResponse from "../utils/buildResponse";

const nonServiceRoutes = Router();

/**
 * Handles health check routes by sending a 200 OK response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
nonServiceRoutes.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/**
 * Handles home routes by sending a home html or json response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
nonServiceRoutes.get("/", (req: Request, res: Response) => {
  const userAgent = req.get("User-Agent") || "";

  if (isBrowser(userAgent)) {
    // Serve static HTML directly
    res.render("home.html"); // Adjust the path accordingly
  } else {
    buildResponse(res, {
      server: "Backend Home",
      message: "The backend services is connected and running!",
    });
  }
});

/**
 * Handles all unmatched routes by sending a 404 error response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
nonServiceRoutes.use("*", (req, res) => {
  const userAgent = req.get("User-Agent") || "";
  if (isBrowser(userAgent)) {
    // Serve static HTML directly
    res.render("404.html"); // Adjust the path accordingly
  } else {
    buildError(StatusCodes.NOT_FOUND, "URL_NOT_FOUND");
  }
});

const inItNonServiceRoutes = (app: Application) => {
  app.use(nonServiceRoutes);
};

export default inItNonServiceRoutes;
