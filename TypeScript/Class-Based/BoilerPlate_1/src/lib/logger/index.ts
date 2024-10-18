import { NodeENVEnums } from "../utils/enums";
import buildProdLogger from "./prodLogger";
import buildDevLogger from "./devLogger";
import { Logger } from "winston";
import { NODE_ENV } from "../constants";

let logger: Logger | null = null;

/**
 * Initializes the logger based on the environment.
 * If the environment is development, it initializes a development logger.
 * If the environment is production, it initializes a production logger.
 */
if (NODE_ENV === NodeENVEnums.DEVELOPMENT) {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
