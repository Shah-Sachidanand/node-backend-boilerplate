import UserRepository from "./userRepository";
import ReferralRepository from "./referralRepository";

/**
 * RepositoryManager is a singleton class that manages the instantiation of repositories.
 * It provides a lazy-loaded instance of UserRepository.
 */
class RepositoryManager {
  private _userRepositoryInstance: UserRepository | undefined;
  private _referralRepositoryInstance: ReferralRepository | undefined;

  /**
   * Getter for UserRepository instance.
   * If the instance does not exist, it creates a new instance and returns it.
   * If the instance exists, it returns the existing instance.
   *
   * @returns The instance of UserRepository.
   */
  protected get userRepository() {
    this._userRepositoryInstance ??= new UserRepository();
    return this._userRepositoryInstance;
  }

  protected get referralRepository() {
    this._referralRepositoryInstance ??= new ReferralRepository();
    return this._referralRepositoryInstance;
  }
}

export default RepositoryManager;
