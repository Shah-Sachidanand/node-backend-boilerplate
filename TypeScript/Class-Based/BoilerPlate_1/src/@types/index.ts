/**
 * Represents the subject of a JWT token.
 *
 * @property {number} id - The unique identifier of the subject.
 * @property {string} first_name - The first name of the subject.
 * @property {string} [last_name] - The last name of the subject (optional).
 * @property {string} [username] - The username of the subject (optional).
 * @property {boolean} [is_premium] - Indicates if the subject has premium status (optional).
 * @property {string} [start_param] - A starting parameter for the subject (optional).
 * @property {string} language_code - The language code of the subject.
 * @property {boolean} allows_write_to_pm - Indicates if the subject is allowed to write to private messages.
 */
export interface JwtSubject {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_premium?: boolean;
  start_param?: string;
  language_code: string;
  allows_write_to_pm: boolean;
}

/**
 * Represents the payload of a JWT token.
 *
 * @property {(JwtSubject | undefined)} sub - The subject of the JWT token.
 * @property {(number | undefined)} exp - The expiration time of the JWT token.
 * @property {(number | undefined)} iat - The time at which the JWT token was issued.
 */
export type JwtPayload = {
  sub?: JwtSubject;
  exp?: number;
  iat?: number;
};

/**
 * Represents an error response.
 *
 * @property {(number | undefined)} code - The error code.
 * @property {(string | undefined)} message - The error message.
 * @property {(string | object | undefined)} moreInfo - Additional information about the error.
 */
export interface ErrorResponse {
  code?: number;
  message?: string;
  moreInfo?: string | object;
}
