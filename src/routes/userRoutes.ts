import * as express from "express";
import { TokenRouteGuard } from "../middlewares/TokenRouteGuard";
import { userController } from "../controllers/UserController";

class UserRoutes {
  public router: express.Router = express.Router();
  constructor() {
    this.config();
  }

  userControllera
  private config(): void {
    this.router.post("/", userController.register); 
    this.router.post("/login", userController.login);
    this.router.get("/tasks/:userid/date/:date", TokenRouteGuard ,userController.getUserTask);
  }
}

export const userRoutes = new UserRoutes().router;