import express, { Application, Request, Response, NextFunction } from "express";
import {customErrorMiddleware, examMiddleware1, examMiddleware2, examMiddleware3  } from "./middlewares/exam2.middleware";

const app: Application = express();

const port: number = 3000;

// app.get("/", 
//     examMiddleware1,
//     examMiddleware2,
//     (req: Request, res: Response, next : NextFunction) => {
//         try{
//             console.log("current")
//             throw new Error("this is error that is makes me");
//             res.send("Hello");
//         }catch(e){
//             next(e);
//             /**
//              * 
//              * @FUNC next(arg)
//              * exist 2 case
//              * case 1 :  NULL or blank // 정상
//              * case 2 : error          // 비정상
//              * 
//              * @ARG error : Error
//              * 사용이유
//              * 1. 현재 위치에서 arror를 확인할 떄
//              * 2. error를 error에 해당하는 미들웨어로 쓰고, 서버 중단을 바이하기 위해서 사용
//              */
//         }
    
// });




app.get("/", examMiddleware1, examMiddleware2, examMiddleware3, (err: Error, req : Request, res: Response, next : NextFunction)=>{
    try{
        console.log("current");
        if(err) throw err;
        
    }catch(e){
        console.log("1")
        next(e)
    }
})

app.use("/",customErrorMiddleware) //error middleware가 맨 밑에 있어야 잡아준다

app.listen(port, () => {
    console.log(`App is listening on port ${port} !`);
});

/**  // '==>' = next()
 * 상황 발생
 * middelware1 ==> middleware2 ==> middleware3 ==> cur
 *   5 출력하기  <== 미들웨어2         <==미들웨어 3          <== 에러 발생(3)
 */