import { Request, Response, NextFunction} from "express";

const examMiddleware1 = (req: Request, res: Response, next : NextFunction)=>{
    try{
        console.log("this middleware is examMiddleware3 (before Next)");
        throw new Error("middleware 1");
        next();

        console.log("this middleware is examMiddleware3 (after Next)");
    }catch(e){
        console.log("catch")
        next(e) 
    }
}

const examMiddleware2 = ( req: Request, res: Response, next : NextFunction)=>{
    try{
        console.log("this middleware is examMiddleware3 (before Next)");
        throw new Error("middleware 2");
        next();

        console.log("this middleware is examMiddleware3 (after Next)");
    }catch(e){
        console.log("catch")
        next(e) 
    }
}

const examMiddleware3 = (req: Request, res: Response, next : NextFunction)=>{
    try{
        console.log("this middleware is examMiddleware3 (before Next)");
        throw new Error("middleware 3");
        next();

        console.log("this middleware is examMiddleware3 (after Next)");
    }catch(e){
        console.log("catch")
        next(e) 
    }
}

const customErrorMiddleware = (err : Error, Req : Request, res : Response, next : NextFunction)=>{
    console.log("error");
    res.send(`<h1>this is error ${err.message}</h1>`);
}


export {examMiddleware1, examMiddleware2, examMiddleware3, customErrorMiddleware};