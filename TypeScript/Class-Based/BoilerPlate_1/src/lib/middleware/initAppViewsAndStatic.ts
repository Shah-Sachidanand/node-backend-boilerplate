import path from "path";
import express, { Application } from "express";
import { renderFile } from "ejs"; // Assuming you're using EJS for rendering

const initAppViewsAndStatic = (app: Application) => {
  // Serve static assets (CSS, JS, images, etc.)
  app.use(express.static(path.resolve("public")));

  // Set the views directory for rendering templates
  app.set("views", path.resolve(__dirname, "../../views"));

  // Configure the engine to render .html files
  app.engine("html", renderFile);
  app.set("view engine", "html");
};

export default initAppViewsAndStatic;
