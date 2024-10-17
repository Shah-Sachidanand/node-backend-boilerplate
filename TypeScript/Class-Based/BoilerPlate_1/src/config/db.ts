import mongoose from "mongoose";
import { APP_PORT, MONGO_URI, NODE_ENV } from "../lib/constants";
import logger from "../lib/logger";

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function attempts to connect to the MongoDB database using the URI defined in the environment variables.
 * If the connection is successful, it logs a success message to the console. If the connection fails, it logs the error message and exits the process.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // Prints initialization
    logger?.info("Starting Server.");
    logger?.info(`Port: ${APP_PORT}`);
    logger?.info(`NODE_ENV: ${NODE_ENV}`);
    logger?.info(`Database Status: Connected!`);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
