import { format, createLogger, transports, Logger } from "winston";

const { combine, printf, errors } = format;

/**
 * Builds and returns a logger instance specifically configured for development environments.
 * This logger outputs logs to the console with a custom format that includes the timestamp, log level, message, stack trace (if available), and any additional metadata.
 *
 * @returns {Logger} A Winston logger instance.
 */
const buildDevLogger = (): Logger => {
  /**
   * Custom log format that includes timestamp, log level, message or stack trace, and metadata.
   *
   * @param {Object} info - Log information.
   * @param {string} info.level - Log level.
   * @param {string} info.message - Log message.
   * @param {string} info.stack - Stack trace (if available).
   * @param {Object} info.meta - Additional metadata.
   * @returns {string} Formatted log string.
   */
  const logFormat = printf(({ level, message, stack, ...meta }) => {
    const metadata = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${new Date().toISOString()} ${level}: ${
      stack || message
    } ${metadata}`;
  });

  return createLogger({
    format: combine(
      format.colorize(), // Colorize the output
      // timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Uncomment to include a custom timestamp format
      errors({ stack: true }), // Include stack traces in error logs
      logFormat // Use the custom log format
    ),
    transports: [new transports.Console()], // Output logs to the console
  });
};

export default buildDevLogger;
