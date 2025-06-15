import { Application } from "express";
import fs from "fs";
import path from "path";

const inItRouters = (app: Application) => {
  // Node.js environment: Use fs and path
  const routersPath = path.resolve(__dirname);
  const versionedFolders = fs.readdirSync(routersPath).filter((folder) => {
    const folderPath = path.join(routersPath, folder);
    return fs.statSync(folderPath).isDirectory(); // Check if it's a directory
  });

  versionedFolders.forEach((folder) => {
    const routerPath = path.join(routersPath, folder);
    const router = require(routerPath).default;
    app.use(`/api/${folder}`, router);
  });
};

export default inItRouters;
