/**
 * This is the main entry point of the application. It sets up the Express server,
 * loads environment variables, connects to the database, and defines routes.
 *
 * @author [Sachidanand Shah]
 * @version 1.0.0
 */

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes"; // Import the consolidated routes
import cors from "cors"; // Import cors
import errorHandlerMiddleware from "./lib/middleware/errorHandlerMiddleware";
import {
  API_VERSION,
  APP_PORT,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  USE_REDIS,
} from "./lib/constants";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Init middleware
app.use(express.json());
app.use(cors()); // Use cors

// Conditional Redis cache based on environment variable
if (USE_REDIS === "true") {
  try {
    const getExpeditiousCache = require("express-expeditious");
    const cache = getExpeditiousCache({
      namespace: "expresscache",
      defaultTtl: "1 minute",
      engine: require("expeditious-engine-redis")({
        redis: {
          host: REDIS_HOST || "localhost",
          port: REDIS_PORT || 6379,
        },
      }),
    });

    app.use(cache); // Apply cache middleware globally
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
}

// Define routes
app.get("/", (req, res) => {
  res.send(`<h1>Server is running on Port : ${APP_PORT}</h1>`);
});
app.use(`/${API_VERSION}`, routes);

// Custom Error handler middleware
app.use(errorHandlerMiddleware);

app.listen(APP_PORT, () => {
  if (NODE_ENV === "development") {
    console.log("---------------------------------------");
    console.log(`* Server   : Started`);
    console.log(`* PORT     : ${APP_PORT}`);
    console.log(`* Database : MongoDB`);
    console.log(`* NODE_ENV : ${NODE_ENV}`);
    console.log(`* URL      : http://localhost:${APP_PORT}`);
    console.log("---------------------------------------");
  }
});
