import { Request, Response } from "express";
import { UserDocument, UserModel } from "../models/User";
import buildError from "../lib/utils/buildError";
import buildResponse from "../lib/utils/buildResponse";
import { StatusCodes } from "../lib/utils/statusCodes";
import dayjs from "dayjs";
import { DOMAIN, NODE_ENV } from "../lib/constants";
import { JwtSubject } from "../@types";
import { getInitData } from "../lib/middleware/auth";
import asyncHandler from "../lib/handlers/asyncHandler";
import ServiceManager from "../services";
import UserMessages from "../lib/messages/user";
import { generateReferralCode } from "../lib/utils/generateReferralCode";

/**
 * UserController is a class that extends ServiceManager and is responsible for handling user-related operations.
 */
class UserController extends ServiceManager {
  constructor() {
    super();
  }

  /**
   * @desc    Get a single user
   * @route   GET /user
   * @access  Public
   * @returns A promise that resolves to void.
   */
  public getUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const reqUser = getInitData(res);
      if (!reqUser?.user?.id) {
        return buildError(StatusCodes.BAD_REQUEST, UserMessages.USER_NOT_FOUND);
      }
      const user: UserDocument | null =
        await this.authServices.findLoggedInUser(reqUser.user.id);
      if (user?._id) {
        buildResponse(res, user);
      } else {
        buildError(StatusCodes.NOT_FOUND, UserMessages.USER_NOT_FOUND);
      }
    }
  );

  /**
   * @desc    Create a new user
   * @route   POST /user
   * @access  Public
   * @returns A promise that resolves to void.
   */
  createUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const reqUser = getInitData(res);
      if (!reqUser?.user?.id) {
        return buildError(StatusCodes.BAD_REQUEST, UserMessages.USER_NOT_FOUND);
      }
      const user: UserDocument = await this.authServices.createUser({
        _id: reqUser.user.id,
        ...reqUser.user,
        referralCode: generateReferralCode(reqUser.user.id),
      } as UserDocument);
      buildResponse(res, user);
    }
  );

  /**
   * @desc    Authenticate a user
   * @route   POST /authenticate
   * @access  Public
   * @returns A promise that resolves to void.
   */
  public authenticate = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { user, auth_date } = this.authServices.validateMiniAppInitData(
        req.body.initDataRaw
      );
      // Validate session expiration
      if (
        !auth_date ||
        (dayjs.unix(auth_date).isBefore(dayjs().subtract(1, "minute")) &&
          NODE_ENV !== "development")
      ) {
        return buildError(
          StatusCodes.BAD_REQUEST,
          UserMessages.USER_INVALID_SESSION
        );
      }

      if (!user) {
        return buildError(
          StatusCodes.BAD_REQUEST,
          UserMessages.USER_DATA_MISSING
        );
      }

      const updatedUser = await this.authServices.getOrCreateUser(
        user as JwtSubject
      );
      if (updatedUser) {
        const jwt = await this.authServices.createAccessToken({
          id: user.id,
          first_name: user.first_name,
          username: user.username,
          is_premium: user?.is_premium,
          language_code: user?.language_code,
          allows_write_to_pm: user?.allows_write_to_pm,
          start_param: user?.start_param,
        });

        res.cookie("miniapp_jwt", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 1,
          domain: DOMAIN,
          sameSite: "none",
        });
        buildResponse(res, { user: updatedUser, token: jwt });
      }
    }
  );
}

export default UserController;
