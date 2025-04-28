import { Request, Response } from "express";
import { collections } from "../db";
import { handleErrors } from "../middlewares/errorHandler";

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await collections.notification.find({}).exec();
    res.json(subscriptions);
  } catch (error) {
    console.error("Fetch subscriptions error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ success: false, error: errors });
  }
};

export const subscribe = async (req: Request, res: Response) => {
  try {
    const subscription = await collections.notification.insertOne({
      endPoint: req.body.endpoint,
      keys: req.body.keys,
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    console.error("Subscription error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ success: false, error: errors });
  }
};
