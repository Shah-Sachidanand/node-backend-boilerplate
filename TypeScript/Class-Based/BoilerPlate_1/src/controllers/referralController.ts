import { Request, Response } from "express";
import asyncHandler from "../lib/handlers/asyncHandler";
import ServiceManager from "../services";
import buildError from "../lib/utils/buildError";
import { StatusCodes } from "../lib/utils/statusCodes";
import { ReferralDocument, UserDocument } from "../models";
import { getInitData } from "../lib/middleware/auth";
import { ReferralStatus } from "../lib/utils/enums";
import buildResponse from "../lib/utils/buildResponse";
import UserMessages from "../lib/messages/user";
import ReferralMessages from "../lib/messages/referral";
import { generateReferralCode } from "../lib/utils/generateReferralCode";

/**
 * ReferralController is a class that extends ServiceManager and is responsible for handling referral-related operations.
 */
class ReferralController extends ServiceManager {
  constructor() {
    super();
  }

  /**
   * @desc    Create a new referral
   * @route   POST /referral
   * @access  Public
   * @returns A promise that resolves to void.
   */
  createReferral = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { referralCode } = req.body;
      const reqUser = getInitData(res);
      if (!reqUser?.user?.id) {
        return buildError(StatusCodes.BAD_REQUEST, UserMessages.USER_NOT_FOUND);
      }
      const referrer = await this.authServices.getUserByReferralCode(
        referralCode
      );

      if (!referrer) {
        return buildError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ReferralMessages.REFERRAL_INVALID_REFERRAL
        );
      }

      const invitedUser = await this.authServices.createUser({
        _id: reqUser.user.id,
        ...reqUser.user,
        referralCode: generateReferralCode(reqUser.user.id),
      } as UserDocument);

      if (!invitedUser) {
        return buildError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          ReferralMessages.REFERRAL_INVALID_USER
        );
      }
      const referral = await this.referralServices.createReferral({
        referredBy: referrer._id,
        invitedUserId: invitedUser._id,
        status: ReferralStatus.ACCEPTED,
      } as ReferralDocument);
      buildResponse(res, referral);
    }
  );

  /**
   * @desc    Get all referrals
   * @route   GET /referral
   * @access  Public
   * @returns A promise that resolves to void.
   */
  getReferrals = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const reqUser = getInitData(res);
      if (!reqUser?.user?.id) {
        return buildError(StatusCodes.BAD_REQUEST, UserMessages.USER_NOT_FOUND);
      }
      const referrals = await this.referralServices.getReferrals(
        reqUser?.user?.id
      );
      buildResponse(res, referrals);
    }
  );
}
export default ReferralController;
