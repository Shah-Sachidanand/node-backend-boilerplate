import { Router } from "express";
import { authMiddleware } from "../lib/middleware/authMiddleware";
import ControllerManager from "../controllers";

/**
 * UserRouter is a class that extends ControllerManager and is responsible for setting up routes related to user operations.
 */
class UserRouter extends ControllerManager {
  public router: Router;

  /**
   * Constructor for UserRouter. Initializes the Express router and sets up routes.
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
      .route("/user")
      .get(authMiddleware, super.userController.getUser)
      .post(authMiddleware, super.userController.createUser);
    this.router.post("/authenticate", super.userController.authenticate);
  }
}

/**
 * Exports the router instance for use in the application.
 */
export default new UserRouter().router;
