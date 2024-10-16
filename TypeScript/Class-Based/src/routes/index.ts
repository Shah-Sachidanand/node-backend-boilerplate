import { Router } from "express";
import userRoutes from "./userRoutes";
import buildError from "../lib/utils/buildError";
import { StatusCodes } from "../lib/utils/statusCodes";
import referralRoutes from "./referralRoutes";

/**
 * This module sets up the main router for the application.
 * It is used to mount all the other route modules.
 */
const router = Router();

/**
 * Mounts the user routes at the root path.
 */
router.use("/", userRoutes);
router.use("/", referralRoutes);
// Add other route modules here

/**
 * Handles all unmatched routes by sending a 404 error response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
router.use("*", () => buildError(StatusCodes.NOT_FOUND, "URL_NOT_FOUND"));

export default router;
