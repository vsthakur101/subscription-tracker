import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({
        title: 'Subscriptions',
        message: 'Subscriptions route',
    });
});

subscriptionRouter.get("/:id", (req, res) => {
    res.send({
        title: 'Subscription',
        message: 'Subscription route',
    });
});

subscriptionRouter.post("/", (req, res) => {
    res.send({
        title: 'Create subscription',
        message: 'Create subscription route',
    });
});

subscriptionRouter.put("/:id", (req, res) => {
    res.send({
        title: 'Update subscription',
        message: 'Update subscription route',
    });
});

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({
        title: 'Delete subscription',
        message: 'Delete subscription route',
    });
});


subscriptionRouter.post("/:id/subscribe", (req, res) => {
    res.send({
        title: 'Subscribe',
        message: 'Subscribe route',
    });
});

subscriptionRouter.post("/:id/unsubscribe", (req, res) => {
    res.send({
        title: 'Unsubscribe',
        message: 'Unsubscribe route',
    });
});

subscriptionRouter.get("/:id/subscribe", (req, res) => {
    res.send({
        title: 'Get subscription',
        message: 'Get subscription route',
    });
});

subscriptionRouter.get("/:id/subscribe/:userId", (req, res) => {
    res.send({
        title: 'Get user subscription',
        message: 'Get user subscription route',
    });
});

export default subscriptionRouter;
// In this file, we have defined the routes for the subscription resource. The routes are similar to the user routes, but they are specific to the subscription resource. We have defined the following routes: