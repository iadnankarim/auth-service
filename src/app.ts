// import express, { Request, Response, NextFunction } from 'express';
import "reflect-metadata"



import express from "express";
import type { Request, Response, NextFunction } from "express";
import type { HttpError } from "http-errors";

import logger from './config/logger.js';
import AuthRouter from "./routes/auth.js";
// import createHttpError from "http-errors";



const app = express()



// app.get('/',async (req,res, next)=>{
//     var err = createHttpError(404, 'This video does not exist!')
//     next(err)

//     res.send('welcome to auth service')
// })


app.get('/', (req,res)=>{
    res.send('welcome to auth service')
})


app.use("/auth",AuthRouter)


app.use((err:HttpError, req:Request, res:Response, next:NextFunction)=>{
    logger.error(err.message)
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        error:[
            {
                type:err.name,
                msg:err.message,
                path:"",
                location:''
            }
        ]
    })
})

export default app