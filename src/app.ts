import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { UserRoutes } from "./routes/UserRoutes";
import { TaskRoutes } from "./routes/TaskRoutes";
import { corsSetup } from "./middlewares/CorsSetup";
import * as RouteErrorHandling from "./middlewares/RouteErrorHandling";
// import { crmRoutes } from "./routes/crmRoutes";

class App {

    public app: express.Application; 
    public mongoUrl: string = "mongodb+srv://jener:orDemo2@cluster0-xb7is.mongodb.net/TaskMonitoring?retryWrites=true&w=majority"
    
    constructor() {
        this.app = express();
        this.mongoSetup();
        this.app.use(corsSetup);
        this.config();         
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/user', new UserRoutes().router);
        this.app.use('/task', new TaskRoutes().router);
        // this.app.use('/test', crmRoutes);
        

        //route error middlewares
        this.app.use(RouteErrorHandling.routeError);
        this.app.use(RouteErrorHandling.routeNotFound); 

    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });    
    }
}

export default new App().app;