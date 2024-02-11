import { UserRequestDto } from "./../dto/request/user-dto.request";
import { NextFunction, Request, Response, Router } from "express";
import userData from "../data/user.data";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json(userData);
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
    const newUser: UserRequestDto = req.body;
    userData.push(newUser);
    res.json({
    msg: "successfully input data in user's dto",
    });
});
const updateUserByUserId = (
    userId: String,
    updatedUserName: String
): UserRequestDto[] => {
    return userData.map((user) =>
    user.userId === userId ? { ...user, userName: updatedUserName } : user
    );
};
router.put("/:userId", (req: Request, res: Response, next: NextFunction) => { //like update
    const { userId } = req.params;
    /**
   * @FUNC update
   */
    (userData as any) = updateUserByUserId(userId, "hello");
    res.json({
    msg: "successfully update user",
    });
});

const filterUserByUserId = (userId: String): UserRequestDto[] => {
    return userData.filter((user) => user.userId !== userId);
};
router.delete("/:userId", (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    (userData as any) = filterUserByUserId(userId);
    res.json({
    msg: "successfully delete user",
    });
});

export default router;