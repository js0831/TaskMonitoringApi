import * as express from "express";
import { userController } from "../../src/controllers/UserController";
import { TokenRouteGuard } from "../../src/middlewares/TokenRouteGuard";

class UserRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post("/", userController.register); 
    this.router.post("/login", userController.login);
    this.router.get("/tasks/:userid/date/:date", TokenRouteGuard ,userController.getUserTask);
  }
}

export const userRoutes = new UserRoutes().router;