import { Application } from "express";
import { REDIS_HOST, USE_REDIS, REDIS_PORT } from "../constants";
import getExpeditiousCache from "express-expeditious";

const inItRedis = (app: Application) => {
  if (USE_REDIS === "true") {
    try {
      const engine = require("expeditious-engine-redis")({
        redis: {
          host: REDIS_HOST || "localhost",
          port: Number(REDIS_PORT) || 6379,
        },
      });

      const cache = getExpeditiousCache({
        namespace: "expresscache",
        defaultTtl: "1 minute",
        engine,
      });

      app.use(cache);
    } catch (error) {
      console.error("Error connecting to Redis:", error);
      return null; // Return null if there is an error
    }
  }
};

export default inItRedis;
