import express, { Application, NextFunction, Request, Response } from "express";
import { UserDto } from "./dto/user-dto";
import { UserRequestDto } from "./dto/request/user-dto.request";
import apiIndex from "./api/index"
import { connection, connectionPool } from "./config/db";

const app: Application = express();

const port: number = 3000;

//json 으로 받기 위해서
app.use(express.json());
//json형태 파일 디코딩 미들웨어
app.use(express.urlencoded({ extended: false }));

connection.connect((err)=>{
    if(err){
        console.log("fall");
    }else{
        console.log("succsses");
    }
})

app.use('/api', apiIndex);

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//     const UserRequestDto : UserRequestDto = req.body;

//     const userDto: UserDto = new UserDto(UserRequestDto);
//     const testUserDto = new UserDto({
//         userId : "taehyun11",
//         userPw : "1234",
//         userName: "taehyun"
//     });
//     console.log(userDto.isEqual(testUserDto));
//     console.log(userDto.toString());
// });

//app.use(customErrorMiddleware);
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
    const [rows, fields] = await connectionPool.query("select *from student");
    console.log(rows);
    console.log(fields);
}); 