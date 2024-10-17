import cors from "cors";
import { ALLOWED_ORIGINS, NODE_ENV } from "../constants";
import { NodeENVEnums } from "../utils/enums";
import { Application } from "express";

function inItCors(app: Application) {
  const allowedOrigins =
    NODE_ENV === NodeENVEnums.DEVELOPMENT ? "*" : ALLOWED_ORIGINS;
  const newCors = cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: [
      "Origin",
      "Host",
      "Content-Type",
      "Content-Length",
      "Accept-Encoding",
      "Accept-Language",
      "Accept",
      "X-CSRF-Token",
      "Authorization",
      "X-Requested-With",
      "X-Access-Token",
    ],
    exposedHeaders: ["Content-Length"],
    credentials: true,
  });
  app.use(newCors);
}

export default inItCors;
