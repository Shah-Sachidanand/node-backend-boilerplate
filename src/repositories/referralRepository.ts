import { ReferralDocument, ReferralModel } from "../models";
import BaseRepository from "./baseRepository";

/**
 * ReferralRepository extends BaseRepository to provide CRUD operations specific to the User model.
 */
class ReferralRepository extends BaseRepository<ReferralDocument> {
  constructor() {
    super(ReferralModel);
  }
}

export default ReferralRepository;
