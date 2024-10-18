import { format, createLogger, transports, Logger } from "winston";
import "winston-daily-rotate-file";

const { timestamp, combine, errors, json, printf } = format;

/**
 * Custom format for log messages.
 * This format includes the timestamp, log level, message, and any additional metadata.
 * If metadata is present, it is stringified and appended to the log message.
 *
 * @param {Object} info - Log information.
 * @param {string} info.level - Log level.
 * @param {string} info.message - Log message.
 * @param {string} info.timestamp - Log timestamp.
 * @param {Object} info.meta - Additional metadata.
 * @returns {string} Formatted log string.
 */
const customFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${timestamp} [${level}] ${message}${metaString}`;
});

/**
 * Builds and returns a logger instance specifically configured for production environments.
 * This logger outputs logs to the console and to daily rotating log files.
 * The log files are stored in the 'logs' directory and are rotated daily.
 * There are separate log files for all logs and error logs.
 * Error logs also include stack traces.
 *
 * @returns {Logger} A Winston logger instance.
 */
const buildProdLogger = (): Logger => {
  return createLogger({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      customFormat
    ),
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile({
        datePattern: "DD-MM-YYYY",
        filename: "logs/all.log",
        level: "info",
        format: combine(
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          errors({ stack: true }),
          customFormat
        ),
      }),
      new transports.DailyRotateFile({
        datePattern: "DD-MM-YYYY",
        filename: "logs/errors.log",
        level: "error",
        format: combine(
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          errors({ stack: true }),
          customFormat
        ),
      }),
    ],
    exceptionHandlers: [
      new transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
      new transports.File({ filename: "logs/rejections.log" }),
    ],
  });
};

export default buildProdLogger;
