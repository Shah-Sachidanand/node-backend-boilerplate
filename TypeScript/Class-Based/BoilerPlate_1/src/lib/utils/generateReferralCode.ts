export const generateReferralCode = (telegramId: number) => {
  return Buffer.from(telegramId.toString())
    .toString("base64")
    .substring(0, 8)
    .toUpperCase();
};
