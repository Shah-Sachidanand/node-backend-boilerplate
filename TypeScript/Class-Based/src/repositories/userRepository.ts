import { UserDocument, UserModel } from "../models";
import BaseRepository from "./baseRepository";

/**
 * UserRepository extends BaseRepository to provide CRUD operations specific to the User model.
 */
class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(UserModel);
  }
}

export default UserRepository;
