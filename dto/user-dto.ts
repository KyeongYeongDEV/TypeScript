import { UserRequestDto } from "./request/user-dto.request";

export class UserDto{
    private  userId : String; //readonly == 자바의 final
    private   userPw : String;
    private   userName : String;

    constructor(user : UserRequestDto){
        this.userId = user.userId;
        this.userPw = user.userPw;
        this.userName = user.userName;
    }
    //위에까지 VO  // pri
    public getUserId():String{
        return this.userId
    }

    public getUserPw():String{
        return this.userPw;
    }

    public getUserName():String{
        return this.userName;
    }

    public isEqual(userDto : UserDto){
        if(userDto.getUserId() !== this.getUserId()) return false;
        return true;
    }

    public toString(): String {
        return `[${this.userId}, ${this.userName}, ${this.userPw}]`;
    }

    //여기까지 있으면 Dto
}

//안정성을 확보하기 위해서
// 데이터를 이런 식으로 받아야 한다.