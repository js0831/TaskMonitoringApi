import * as express from "express";
import { TokenRouteGuard } from "../middlewares/TokenRouteGuard";
import { UserController } from "../controllers/UserController";

class UserRoutes {
  public router: express.Router = express.Router();
  public userController = new UserController();
  constructor() {
    this.config();
  }

  private config(): void {
    this.router.post("/", this.userController.register); 
    this.router.post("/login", this.userController.login);
    this.router.get("/tasks/:userid/date/:date", TokenRouteGuard , this.userController.getUserTask);
  }
}

export const userRoutes = new UserRoutes().router;