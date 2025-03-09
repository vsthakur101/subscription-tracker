import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send({
        title: 'Users',
        message: 'Users route',
    });
});

userRouter.get("/:id", (req, res) => {  
    res.send({
        title: 'User',
        message: 'User route',
    });
});  

userRouter.post("/", (req, res) => {
    res.send({
        title: 'Create user',
        message: 'Create user route',
    });
});

userRouter.put("/:id", (req, res) => {
    res.send({
        title: 'Update user',
        message: 'Update user route',
    });
});

userRouter.delete("/:id", (req, res) => {
    res.send({
        title: 'Delete user',
        message: 'Delete user route',
    });
});

export default userRouter;