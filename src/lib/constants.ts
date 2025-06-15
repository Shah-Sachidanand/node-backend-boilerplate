import dotenv from "dotenv-safe";
// Load environment variables
dotenv.config();

/**
 * Telegram Bot Token for bot authentication
 * @type {string}
 */
export const TELEGRAM_BOT_TOKEN: string = process.env
  .TELEGRAM_BOT_TOKEN as string;

/**
 * JWT Secret Key for token-based authentication
 * @type {string}
 */
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY as string;

/**
 * Node Environment Variable to determine the environment (e.g., development, production)
 * @type {string}
 */
export const NODE_ENV: string = process.env.NODE_ENV as string;

/**
 * Domain of the application
 * @type {string}
 */
export const DOMAIN: string = process.env.DOMAIN as string;

/**
 * MongoDB URI for establishing a connection to the MongoDB database
 * @type {string}
 */
export const MONGO_URI: string = process.env.MONGO_URI as string;

/**
 * Redis Host for establishing a connection to the Redis server
 * @type {string}
 */
export const REDIS_HOST: string = process.env.REDIS_HOST as string;

/**
 * Redis Port for establishing a connection to the Redis server
 * @type {string}
 */
export const REDIS_PORT: string = process.env.REDIS_PORT as string;

/**
 * The port number on which the application is running
 * @type {string}
 */
export const APP_PORT: string = process.env.PORT as string;

/**
 * Environment variable indicating whether to use Redis for caching
 * @type {string}
 */
export const USE_REDIS: string = process.env.USE_REDIS as string;

/**
 * API Version
 * @type {string}
 */
export const API_VERSION: string = process.env.API_VERSION as string;

/**
 * Allowed Origins
 * @type {string}
 */
export const ALLOWED_ORIGINS: string = process.env.ALLOWED_ORIGINS as string;
