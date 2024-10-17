import { Application } from "express";
import { renderFile } from "ejs"; // Assuming you're using EJS for rendering
import path from "path";
import { NodeENVEnums } from "../utils/enums";

const initAppViewsAndStatic = (app: Application) => {
  // Determine the environment
  const isProduction = process.env.NODE_ENV === NodeENVEnums.PRODUCTION;

  // Set the views directory for rendering templates
  const viewsDir = isProduction
    ? path.resolve(__dirname, "./views")
    : path.resolve(__dirname, "../../views");
  app.set("views", viewsDir);

  // Configure the engine to render .html files
  app.engine("html", renderFile);
  app.set("view engine", "html");
};

export default initAppViewsAndStatic;
