import { Application } from "express";
import { renderFile } from "ejs"; // Assuming you're using EJS for rendering
import path from "path";
import { NodeENVEnums } from "../utils/enums";

const initAppViewsAndStatic = (app: Application) => {
  // Set the views directory for rendering templates

  const viewsDir = path.resolve(__dirname, "../../views");
  app.set("views", viewsDir);

  // Configure the engine to render .html files
  app.engine("html", renderFile);
  app.set("view engine", "html");
};

export default initAppViewsAndStatic;
