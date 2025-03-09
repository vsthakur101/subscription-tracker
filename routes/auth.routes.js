import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
    res.send({
      title: 'Sign-up',
    message: 'Sign-up route',
  });
});

authRouter.post("/sign-in", (req, res) => {
    res.send({
      title: 'Sign-in',
    message: 'Sign-in route',
  });
});

authRouter.post("/sign-out", (req, res) => {
    res.send({
      title: 'Sign-out',
    message: 'Sign-out route',
  });
});

export default authRouter;