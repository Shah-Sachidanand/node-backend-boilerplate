import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../lib//constants";
import { JwtPayload } from "../@types";
import buildError from "../lib//utils/buildError";
import { StatusCodes } from "../lib//utils/statusCodes";

/**
 * Class for JWT services.
 */
class JWTServices {
  /**
   * Generates a JWT token.
   * @param {JwtPayload} payload - The payload to be included in the token.
   * @returns {string} The generated JWT token.
   */
  static generateToken(payload: JwtPayload): string {
    if (!payload)
      return buildError(StatusCodes.BAD_GATEWAY, "Payload cannot be empty");
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "600s" });
  }

  /**
   * Verifies a JWT token.
   * @param {string} token - The JWT token to be verified.
   * @returns {JwtPayload | null} The decoded payload if the token is valid, otherwise null.
   */
  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
      return decoded;
    } catch (err) {
      buildError(StatusCodes.UNAUTHORIZED, "Invalid token");
      return null;
    }
  }
}

export default JWTServices;
