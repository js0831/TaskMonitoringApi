import * as express from "express";
import { TaskController } from "../controllers/TaskController";
import { TokenRouteGuard } from "../middlewares/TokenRouteGuard";

class TaskRoutes {
  public router: express.Router = express.Router();
  public taskController = new TaskController();
  constructor() {
    this.config();
  }

  private config(): void { 
    this.router.post("/",TokenRouteGuard ,this.taskController.add);
    this.router
    .delete("/:id",TokenRouteGuard ,this.taskController.delete)
    .put("/:id",TokenRouteGuard ,this.taskController.update);    
  }
}

export const taskRoutes = new TaskRoutes().router;
