/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildError = (code: number, message: string) => {
  throw {
    code,
    message,
  };
};

export default buildError;
