import userRoutes from "./userRoutes";
import referralRoutes from "./referralRoutes";
import { Application, Router } from "express";
import { API_VERSION } from "../lib/constants";

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

const inItRouters = (app: Application) => {
  app.use(`/${API_VERSION}`, router);
};

export default inItRouters;
