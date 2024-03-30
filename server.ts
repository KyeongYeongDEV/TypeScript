import express, { Application, NextFunction, Request, Response } from "express";
import session from "express-session";

import apiIndex from "./api/index"
import { connection, connectionPool } from "./config/db";

const app: Application = express();

const port: number = 3000;

app.use(session({
    //암호화
    secret:"태현 바보",
    resave : false,
    saveUninitialized : false
}))

//json 으로 받기 위해서
app.use(express.json());
//json형태 파일 디코딩 미들웨어
app.use(express.urlencoded({ extended: false }));


async function isExistUserByUserId(userId:string){
    type userType = {
        uid :  number,
        userid : string,
        username : string,
        userpw : string
    }
    const connection  = await connectionPool.getConnection();
    const [users, fields] = await connection.query("select *from owners WHERE userid = ? ",[userId]) as [userType[], object];
    
    if(users.length == 0) throw new Error("can not find user");
    
    return users[0];
}

function isSameUserByUserPw(userPw: string, foundUserPw : string){
    return (userPw === foundUserPw ? true: false)
}

declare module "express-session"{ // 저런 모듈 안에 내가 뭐 하나 박을게 
    interface SessionData{ // 이 친구 안에 user을 박는데 
        user ? : { //Null일 수도 있고 아니면 아랫 것들이야
            uid : number, 
            userid: string, 
            username : string 
        }
    }
}

app.get("/user",(req:Request, res: Response, next:NextFunction)=>{
    if(!(req.session && req.session.user)) // 없으면 로그인 안 된 거다
        res.send("nope");
    res.send(req.session.user);
})

app.post("/logout",(req:Request, res:Response, next:NextFunction)=>{
    if(!(req.session && req.session.user)) 
        return res.send("어쩔 로그인 안됨");
    req.session.destroy((err)=>{
        if(err) throw new Error("실패함")
    })

    res.send("로그아웃 성공")
});

app.post("/login",async (req:Request, res:Response, next:NextFunction)=>{
    try{
        type loginData={
            userid : string,
            userpw : string
        }
        const user = req.body as loginData
        const foundUser = await isExistUserByUserId(user.userid)
        if(!isSameUserByUserPw(user.userpw, foundUser.userpw)) throw new Error("not valid user")

        req.session.user = {
            uid : foundUser.uid,
            userid: foundUser.userid,
            username : foundUser.username,

        }
        res.json({msg : "successfully login user!!"})
    }catch(err ){
        res.json({err:"err"});
    }
})

app.listen(port, async() => {
    // console.log(`App is listening on port ${port} !`);


    //내가 상담원 하나를 계속 쓴다
    // const connection = await connectionPool.getConnection();
    // await connection.beginTransaction()
    // const [rows, fields] = await connection.query("select *from student");
    // console.log(rows);
    // console.log(fields);
    // await connection.commit();
    // connection.release()


    // 자동으로 할당
    // const [rows, fields] = await connectionPool.query("select *from student");
    // console.log(rows);
    // console.log(fields);
}); 