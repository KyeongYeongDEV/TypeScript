import {Request, Response, NextFunction} from "express";

const examMiddleware1 = (req : Request, res:Response, next : NextFunction )=>{
    console.log("this middleware is examMiddleware1 (before Next)");
    next();
    console.log("this middleware is examMiddleware1 (after Next)");
};

const examMiddleware2 = (req : Request, res:Response, next : NextFunction )=>{
    try{
        console.log("this middleware is examMiddleware2 (before Next)");
        
        throw new Error("this is error");
        next();
        console.log("this middleware is examMiddleware2 (after Next)");
    }catch(e){
        
    }
     
};

const customErrorMiddleware = (err : Error, Req : Request, res : Response, next : NextFunction)=>{
    console.log("error");
    res.send("<h1>this is error middleware</h1>");
}

export {examMiddleware1, examMiddleware2, customErrorMiddleware};

