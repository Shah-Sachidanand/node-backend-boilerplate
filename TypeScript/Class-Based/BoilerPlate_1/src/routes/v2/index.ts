import { Router } from "express";
import { loadRoutes } from "../../lib/utils/routeUtils";

/**
 * This module sets up the main router for the application.
 * It is used to mount all the other route modules.
 */
const v2Router = Router();

/**
 * Initialize routes from the routes directory.
 */
const routesPath = __dirname; // Get the current directory
loadRoutes(v2Router, routesPath); // Load and mount routes

export default v2Router;
