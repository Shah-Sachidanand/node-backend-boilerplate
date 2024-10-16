import mongoose from "mongoose";
import { MONGO_URI } from "../lib/constants";

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function attempts to connect to the MongoDB database using the URI defined in the environment variables.
 * If the connection is successful, it logs a success message to the console. If the connection fails, it logs the error message and exits the process.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.info("MongoDB connected");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
