import { NodeENVEnums } from "../utils/enums";
import buildProdLogger from "./prodLogger";
import buildDevLogger from "./devLogger";
import { Logger } from "winston";
import { NODE_ENV } from "../constants";

let logger: Logger | null = null;

if (NODE_ENV === NodeENVEnums.DEVELOPMENT) {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
