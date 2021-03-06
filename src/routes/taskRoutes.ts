import * as express from "express";
import { taskController } from "../controllers/TaskController";
import { TokenRouteGuard } from "../middlewares/TokenRouteGuard";

class TaskRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void { 
    this.router.post("/",TokenRouteGuard ,taskController.add);
    this.router
    .delete("/:id",TokenRouteGuard ,taskController.delete)
    .put("/:id",TokenRouteGuard ,taskController.update);    
  }
}

export const taskRoutes = new TaskRoutes().router;
