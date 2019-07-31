import { Request, Response } from "express";
import { Task } from '../models/taskModel';
 


export class TaskController { 
  
  public root(req: Request, res: Response) {
    res.status(200).send({
      message: "USER GET request successful"
    });
  }

  public add(req: Request, res: Response){
    const param = req.body;
    const newTask = new Task({
        user: param.user,
        title: param.title,
        description: param.description,
        status: param.status
    });

    newTask.save()
    .then( task => res.status(200).json({
        status:'ok',
        message:'success',
        data:task
    }))
    .catch( 
        err => res.status(200).json({ 
            status:'failed',
            error:err,
            message:'failed'
        })
    );
  } // END : add
}

export const taskController = new TaskController();