import * as express from "express";
import { contactController } from "../controllers/crmController";
import { TokenRouteGuard } from "../middlewares/TokenRouteGuard";

class CrmRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/", TokenRouteGuard, contactController.root);
    // this.router.post("/", userController.register);
    // this.router.post("/login", userController.login);
  }
}

export const crmRoutes = new CrmRoutes().router;
