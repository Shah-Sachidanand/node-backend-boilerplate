/**
 * This is the main entry point of the application. It sets up the Express server,
 * loads environment variables, connects to the database, and defines routes.
 *
 * @author Sachidanand Shah
 * @version 1.0.0
 */

import express from "express";
import inItRouters from "./routes";
import connectDB from "./config/db";
import dotenvSafe from "dotenv-safe";
import { APP_PORT } from "./lib/constants";
import inItCors from "./lib/middleware/cors";
import inItRedis from "./lib/middleware/redis";
import inItLogger from "./lib/middleware/logger";
import errorHandlerMiddleware from "./lib/middleware/errorHandler";
import inItNonServiceRoutes from "./lib/middleware/nonServiceRoutes";
import initAppViewsAndStatic from "./lib/middleware/initAppViewsAndStatic";

/**
 * Initializes the Express server, loads environment variables, connects to the database,
 * and sets up routes and middleware.
 */
const inItServer = () => {
  // Load environment variables
  dotenvSafe.config();

  // Connect to the database
  connectDB();

  const app = express();

  // Initialize middleware
  app.use(express.json());

  // Initialize CORS middleware
  inItCors(app);

  // Initialize Redis cache middleware
  inItRedis(app);

  // Initialize application views and static assets
  initAppViewsAndStatic(app);

  // Initialize logger middleware
  inItLogger(app);

  // Initialize routers
  inItRouters(app);

  // Initialize non-service routes
  inItNonServiceRoutes(app);

  // Custom Error handler middleware
  app.use(errorHandlerMiddleware);

  // Start the server
  app.listen(APP_PORT);
};

export default inItServer;
