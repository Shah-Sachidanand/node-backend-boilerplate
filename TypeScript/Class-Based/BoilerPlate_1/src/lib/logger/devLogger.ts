import { format, createLogger, transports, Logger } from "winston";

const { timestamp, combine, printf, errors } = format;

const buildDevLogger = (): Logger => {
  const logFormat = printf(({ level, message, stack, ...meta }) => {
    const metadata = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${new Date().toISOString()} ${level}: ${
      stack || message
    } ${metadata}`;
  });

  return createLogger({
    format: combine(
      format.colorize(),
      // timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};

export default buildDevLogger;
