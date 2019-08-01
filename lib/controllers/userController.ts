import { Request, Response } from "express";
import { User } from '../models/userModel'; 
import { Task } from "../models/taskModel";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'; 



export class UserController { 
  
  public root(req: Request, res: Response) {
    res.status(200).send({
      message: "USER GET request successful"
    });
  }

  public getUserTask(req: Request, res: Response){
    const params = req.params;
    const dateString = new Date(params.date).toDateString();
    const targetDate = new Date(dateString);
    const endOfday = new Date(dateString);
    endOfday.setDate(endOfday.getDate() + 1);

    Task.find({
        user: params.userid,
        date: {
            $gte: targetDate,
            $lt: endOfday
        }
    }).exec().then( docs => {
        res.status(200).json({
            status:'ok',
            data:docs,
            message:'success'
        })
    }).catch(err => {
        res.status(500).json({
            status:'failed',
            error:err,
            message:'Task not found'
        });
    });
  }

  public register(req: Request, res: Response){
    const param = req.body; 
    bcrypt.hash(param.password, 10,(err, hash) => {              
        if(!err){
            const newUser = new User({
                firstname: param.firstname,
                lastname: param.lastname,
                username: param.username,
                password: hash
            });
        
            newUser
            .save()
            .then( user => res.status(200).json({
                status:'ok',
                message:'success',
                data:user
            }))
            .catch( 
                err => res.status(200).json({ 
                    status:'failed',
                    error:err,
                    message:'Registration failed'
                })
            );
        }else{
            return res.status(500).json({
                status:'failed',
                error:err,
                message:'hashing error'
            });
        }
    }); 
  }

//   public getByID(req: Request, res: Response){
//     const id = req.params.id;
    
//     //cache
//     this.redisClient.get(id, function (err, reply) {
//         if(reply){

//             //cache
//             res.status(200).json({
//                 status:'ok from redis',
//                 data:JSON.parse(reply),
//                 message:'success'
//             });

//         }else{

//             //MONGO
//             User.findById(id).exec()
//             .then(doc => {
//                 this.redisClient.set(id, JSON.stringify(doc));
//                 res.status(200).json({
//                     status:'ok from mongo',
//                     data:doc,
//                     message:'success'
//                 });
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     status:'failed',
//                     error:err,
//                     message:'User not found'
//                 });
//             });
//             //END

//         }
//     })
    
    
      
//   }

//   public list(req: Request, res: Response){
//     const params = req.params;
//     const limit = parseInt(params.limit);
//     const page = parseInt(params.page);    
//     const skip = limit * page;

//     User.find().select()
//         .limit(limit)
//         .skip(skip)
//     .exec()
//     .then(doc => {
//         res.status(200).json({
//             status:'ok',
//             message:'success',
//             data:doc
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//             status:'failed',
//             error:err,
//             message:'No Record found'
//         });
//     });
//   }
  
  public login(req: Request, res: Response) {
      const param = req.body;
      User.find({username:param.username}).exec().then( (result) => { 
        if( result.length  < 1 ){
            return res.status(200).json({
                status:'failed',
                message:'Authentication Failed'
            }); 
        }else{       
                bcrypt.compare(param.password, result[0].password, (err, equal) => {
                    if( err || !equal ) {
                        return res.status(200).json({
                            status:'failed',
                            message:'Authentication Failed.'
                        });
                    } else {  
                            const token = jwt.sign(
                                {
                                    username: param.username,
                                    userId: result[0]._id,
                                },
                                'process.env.JWT_KEY',
                                {
                                    expiresIn:"1h"
                                }
                            );

                            return res.status(200).json({
                                status:'ok',
                                message:'success',
                                data:result[0],
                                token:token,
                            });  
                    }
                });//bcrypt
        }//ELSE
      });
  }// LOGIN

}

export const userController = new UserController();
