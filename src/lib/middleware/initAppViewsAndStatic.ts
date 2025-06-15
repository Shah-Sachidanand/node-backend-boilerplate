import { Application } from "express";
import { renderFile } from "ejs"; // Assuming you're using EJS for rendering
import path from "path";

/**
 * Initializes the application views and static files.
 * @param app - The Express application.
 */
const initAppViewsAndStatic = (app: Application) => {
  // Set the views directory for rendering templates

  const viewsDir = path.resolve(__dirname, "../../views");
  app.set("views", viewsDir);

  // Configure the engine to render .html files
  app.engine("html", renderFile);
  app.set("view engine", "html");
};

export default initAppViewsAndStatic;
