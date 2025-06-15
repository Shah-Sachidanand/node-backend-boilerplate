/**
 * Generates a referral code based on the provided Telegram ID.
 *
 * This function converts the Telegram ID to a string, encodes it in base64,
 * takes the first 8 characters of the encoded string, and converts it to uppercase.
 *
 * @param {number} telegramId - The Telegram ID to generate the referral code from.
 * @returns {string} The generated referral code.
 */
export const generateReferralCode = (telegramId: number) => {
  return Buffer.from(telegramId.toString())
    .toString("base64")
    .substring(0, 8)
    .toUpperCase();
};
