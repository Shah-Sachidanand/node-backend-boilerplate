import {
  validate,
  parse,
  type InitDataParsed,
} from "@telegram-apps/init-data-node";
import { type RequestHandler, type Response } from "express";
import { TELEGRAM_BOT_TOKEN } from "../constants";
import buildError from "../utils/buildError";
import { handleError } from "../handlers/handleError";
import { StatusCodes } from "../utils/statusCodes";

/**
 * Sets init data in the specified Response object.
 * @param res - Response object.
 * @param initData - init data.
 */
function setInitData(res: Response, initData: InitDataParsed): void {
  res.locals.initData = initData;
}

/**
 * Extracts init data from the Response object.
 * @param res - Response object.
 * @returns Init data stored in the Response object. Can return undefined in case,
 * the client is not authorized.
 */
export function getInitData(res: Response): InitDataParsed | undefined {
  if (res.locals.initData && res.locals.initData?.user) {
    return res.locals.initData;
  }
  buildError(
    StatusCodes.NON_AUTHORITATIVE_INFORMATION,
    "Invalid Telegram User"
  );
  return undefined;
}

/**
 * Middleware which authorizes the external client.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
export const authMiddleware: RequestHandler = (req, res, next) => {
  // We expect passing init data in the Authorization header in the following format:
  // <auth-type> <auth-data>
  // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
  try {
    const [authType, authData = ""] = (req.header("authorization") || "").split(
      " "
    );

    if (!authData || !authType) {
      return buildError(401, "authType or authData not supplied");
    }

    switch (authType) {
      case "tma":
        try {
          // Validate init data.
          validate(authData, TELEGRAM_BOT_TOKEN, {
            // We consider init data sign valid for 1 hour from their creation moment.
            expiresIn: 3600,
          });

          // Parse init data. We will surely need it in the future.
          setInitData(res, parse(authData));
          return next();
        } catch (e: any) {
          return next(buildError(401, e.message));
        }
      default:
        return next(buildError(404, "Unauthorized"));
    }
  } catch (error: any) {
    handleError(res, error);
  }
};
