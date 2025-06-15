import { Router } from "express";
import fs from "fs";
import path from "path";

/**
 * Dynamically loads and mounts routes from a specified directory.
 * @param router - The main router to which routes will be mounted.
 * @param routesDirectory - The directory containing route files.
 */
export const loadRoutes = (router: Router, routesDirectory: string) => {
  fs.readdirSync(routesDirectory).forEach((file) => {
    // Only process .ts files that are not the index.ts file
    if (file.endsWith(".ts") && file !== "index.ts") {
      const route = require(path.join(routesDirectory, file)).default; // Import the route
      const routePath = `/${file.replace(".ts", "")}`; // Use the file name as the route path
      router.use(routePath, route); // Mount the route
    }
  });
};
