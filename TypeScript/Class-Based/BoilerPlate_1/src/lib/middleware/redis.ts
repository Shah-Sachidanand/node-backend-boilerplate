import { Application } from "express";
import { REDIS_HOST, USE_REDIS, REDIS_PORT } from "../constants";
import getExpeditiousCache from "express-expeditious";
import logger from "../logger";

/**
 * Initializes Redis caching middleware for the Express application.
 *
 * @param app - The Express application instance.
 * @returns The Redis caching middleware instance or null if Redis is not enabled.
 */
const inItRedis = (app: Application): void | null => {
  if (USE_REDIS === "true") {
    try {
      const engine: any = require("expeditious-engine-redis")({
        redis: {
          host: REDIS_HOST || "localhost",
          port: Number(REDIS_PORT) || 6379,
        },
      });

      // Configure the cache using Expeditious
      const cache = getExpeditiousCache({
        namespace: "expresscache",
        defaultTtl: "1 minute",
        engine,
      });

      // If cache is initialized successfully, use it in the Express app
      if (cache) {
        app.use(cache);
        logger?.info("Redis Caching: Enabled");
      } else {
        logger?.error("Failed to initialize caching.");
      }
    } catch (error) {
      // Log the error when Redis connection or engine initialization fails
      logger?.error("Error initializing Redis caching:", error);
      return null;
    }
  } else {
    logger?.info("Redis Caching: Not enabled");
  }

  // Return null if Redis is not enabled or an error occurs
  return null;
};

export default inItRedis;
