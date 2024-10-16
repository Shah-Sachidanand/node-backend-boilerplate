import UserMessages from "../lib/messages/user";
import buildError from "../lib/utils/buildError";
import { StatusCodes } from "../lib/utils/statusCodes";
import { ReferralDocument } from "../models";
import RepositoryManager from "../repositories";

class ReferralServices extends RepositoryManager {
  constructor() {
    super();
  }

  async createReferral(referral: ReferralDocument): Promise<ReferralDocument> {
    const isUserExists = await this.userRepository.findOne({
      _id: referral.invitedUserId,
    });
    if (!isUserExists) {
      return buildError(StatusCodes.CONFLICT, UserMessages.USER_ALREADY_EXISTS);
    }

    return this.referralRepository.create(referral);
  }

  async getReferrals(_id: number): Promise<ReferralDocument[]> {
    return this.referralRepository.findAll({ userId: _id });
  }
}

export default ReferralServices;
