import { Router } from "express";
import { authMiddleware } from "../lib/middleware/authMiddleware";
import ControllerManager from "../controllers";

/**
 * ReferralRouter is a class that extends ControllerManager and is responsible for setting up routes related to user operations.
 */
class ReferralRouter extends ControllerManager {
  public router: Router;

  /**
   * Constructor for ReferralRouter. Initializes the Express router and sets up routes.
   */
  constructor() {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  /**
   * Initializes all routes related to user operations.
   * This method sets up routes for getting all users, getting a single user, creating a new user, and authenticating a user.
   */
  private initializeRoutes() {
    this.router
      .route("/referral")
      .get(authMiddleware, super.referralController.getReferrals)
      .post(authMiddleware, super.referralController.createReferral);
  }
}

/**
 * Exports the router instance for use in the application.
 */
export default new ReferralRouter().router;
