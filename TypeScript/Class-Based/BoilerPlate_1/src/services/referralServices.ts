import UserMessages from "../lib/messages/user";
import buildError from "../lib/utils/buildError";
import { StatusCodes } from "../lib/utils/statusCodes";
import { ReferralDocument } from "../models";
import RepositoryManager from "../repositories";

/**
 * ReferralServices extends RepositoryManager to provide referral-related services.
 */
class ReferralServices extends RepositoryManager {
  /**
   * Constructor for ReferralServices.
   */
  constructor() {
    super();
  }

  /**
   * Creates a new referral.
   * @param {ReferralDocument} referral - The referral to be created.
   * @returns {Promise<ReferralDocument>} A promise that resolves to the created referral.
   */
  async createReferral(referral: ReferralDocument): Promise<ReferralDocument> {
    const isUserExists = await this.userRepository.findOne({
      _id: referral.invitedUserId,
    });
    if (!isUserExists) {
      return buildError(StatusCodes.CONFLICT, UserMessages.USER_ALREADY_EXISTS);
    }

    return this.referralRepository.create(referral);
  }

  /**
   * Retrieves all referrals for a given user.
   * @param {_id} _id - The user id for whom the referrals are to be retrieved.
   * @returns {Promise<ReferralDocument[]>} A promise that resolves to an array of referrals.
   */
  async getReferrals(_id: number): Promise<ReferralDocument[]> {
    return this.referralRepository.findAll({ userId: _id });
  }
}

export default ReferralServices;
