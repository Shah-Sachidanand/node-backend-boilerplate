import { format, createLogger, transports, Logger } from "winston";
import "winston-daily-rotate-file";

const { timestamp, combine, errors, json, printf } = format;

// Custom format for log messages
const customFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${timestamp} [${level}] ${message}${metaString}`;
});

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
