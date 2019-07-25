import * as express from "express";
import { userController } from "../controllers/UserController";

class UserRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/", userController.root);
    this.router.post("/", userController.register);
    this.router.post("/login", userController.login);
  }
}

export const userRoutes = new UserRoutes().router;
