import * as crypto from "crypto";
import { TELEGRAM_BOT_TOKEN } from "../constants";

/**
 * Interface for initializing data.
 * @property {string | undefined} query_id - The query ID.
 * @property {Record<string, any> | undefined} user - The user data.
 * @property {number | undefined} auth_date - The authentication date.
 * @property {string | undefined} start_param - The start parameter.
 * @property {string | undefined} chat_instance - The chat instance.
 * @property {string | undefined} chat_type - The chat type.
 * @property {string | undefined} hash - The hash.
 */
export interface InitData {
  query_id: string | undefined;
  user: Record<string, any> | undefined;
  auth_date: number | undefined;
  start_param: string | undefined;
  chat_instance: string | undefined;
  chat_type: string | undefined;
  hash: string | undefined;
}

/**
 * Creates a secret for the web app.
 * @returns {Buffer} The secret buffer.
 */
export function createWebAppSecret(): Buffer {
  return crypto
    .createHmac("sha256", "WebAppData")
    .update(TELEGRAM_BOT_TOKEN)
    .digest();
}

/**
 * Decodes the initialization data.
 * @param {string} initDataRaw - The raw initialization data.
 * @returns {InitData} The decoded initialization data.
 */
export function decodeInitData(initDataRaw: string): InitData {
  const params = new URLSearchParams(initDataRaw);

  const userParam = params.get("user");
  let userObj;
  if (userParam) {
    userObj = JSON.parse(userParam);
  }

  const queryId = params.get("query_id");
  const authDate = parseInt(params.get("auth_date")!);
  const startParam = params.get("start_param");
  const chatInstance = params.get("chat_instance");
  const chatType = params.get("chat_type");
  const hash = params.get("hash");

  return {
    query_id: queryId ?? undefined,
    user: userObj,
    start_param: startParam ?? undefined,
    chat_instance: chatInstance ?? undefined,
    chat_type: chatType ?? undefined,
    auth_date: authDate ?? undefined,
    hash: hash ?? undefined,
  };
}

/**
 * Verifies the Telegram web app initialization data.
 * @param {InitData} initData - The initialization data.
 * @param {Buffer} secretKey - The secret key.
 * @returns {boolean} True if the data is verified, otherwise false.
 */
export function verifyTelegramWebAppInitData(
  initData: InitData,
  secretKey: Buffer
): boolean {
  const expectedHash = initData.hash;
  const checkList: string[] = [];
  for (const [k, v] of Object.entries({
    query_id: initData.query_id,
    user: JSON.stringify(initData.user),
    auth_date: initData.auth_date,
    start_param: initData.start_param,
    chat_instance: initData.chat_instance,
    chat_type: initData.chat_type,
  })) {
    if (v) {
      checkList.push(`${k}=${v}`);
    }
  }

  const checkString: string = checkList.sort().join("\n");

  const hmacHash: string = crypto
    .createHmac("sha256", secretKey)
    .update(checkString, "utf-8")
    .digest("hex");

  return hmacHash === expectedHash;
}
