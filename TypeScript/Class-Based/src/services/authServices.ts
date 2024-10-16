import { JwtPayload, JwtSubject } from "../@types";
import {
  // createWebAppSecret,
  decodeInitData,
  InitData,
  // verifyTelegramWebAppInitData,
} from "../lib/utils/auth.utils";
// import buildError from "../utils/buildError";
// import { StatusCodes } from "../utils/statusCodes";
import JWTServices from "./jwtServices";
import RepositoryManager from "../repositories";
import { UserDocument } from "../models";
import { ObjectId } from "mongoose";
import { generateReferralCode } from "../lib/utils/generateReferralCode";
import buildError from "../lib/utils/buildError";
import { StatusCodes } from "../lib/utils/statusCodes";
import UserMessages from "../lib/messages/user";

class AuthService extends RepositoryManager {
  constructor() {
    super();
  }
  validateMiniAppInitData(raw: string): InitData {
    const initData = decodeInitData(raw);
    // const secretKey = createWebAppSecret();

    // if (!verifyTelegramWebAppInitData(initData, secretKey)) {
    //   buildError(StatusCodes.BAD_REQUEST, "Invalid init data");
    // }

    return initData;
  }

  async createAccessToken(user: JwtPayload["sub"]): Promise<string> {
    const payload: JwtPayload = { sub: user };
    return JWTServices.generateToken(payload);
  }

  async getOrCreateUser(user: JwtSubject) {
    const isUserExists = await this.userRepository.findOne({ _id: user.id });
    if (isUserExists) {
      return buildError(StatusCodes.CONFLICT, UserMessages.USER_ALREADY_EXISTS);
    }
    return await this.userRepository
      .findOneAndUpdate(
        { _id: user.id },
        {
          $set: {
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            isPremium: user.is_premium,
            languageCode: user.language_code,
            allowsWriteToPm: user.allows_write_to_pm,
            referralCode: generateReferralCode(user.id),
          },
        },
        {
          upsert: true,
          new: true,
        }
      )
      .lean();
  }

  /**
   * Creates a new user in the database.
   *
   * @param docs - The user document to be created.
   * @returns A promise that resolves to the created user document.
   */
  async createUser(docs: UserDocument): Promise<UserDocument> {
    const isUserExists = await this.userRepository.findOne({ _id: docs.id });
    if (isUserExists) {
      return buildError(StatusCodes.CONFLICT, UserMessages.USER_ALREADY_EXISTS);
    }
    return await this.userRepository.create(docs);
  }

  /**
   * Finds a user by their ID.
   *
   * @param _id The ID of the user to find.
   * @returns A promise that resolves to the user document if found, otherwise null.
   */
  async findLoggedInUser(_id: ObjectId | number): Promise<UserDocument | null> {
    return await this.userRepository.findById(_id);
  }

  async getUserByReferralCode(
    referralCode: string
  ): Promise<UserDocument | null> {
    return await this.userRepository.findOne({ referralCode });
  }
}
export default AuthService;
