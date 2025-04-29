import webPush from "web-push";
import dotenv from "dotenv";
import { collections } from "../db";

dotenv.config();
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || "";
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || "";
const mailAddress = process.env.MAILTO_ADDRESS || "";

webPush.setVapidDetails(mailAddress, vapidPublicKey, vapidPrivateKey);
export const notifySubscribers = async (payload: string) => {
  const subscriptions = await collections.notification.find({}).exec();

  subscriptions.forEach((subscription) => {
    webPush
      .sendNotification(
        {
          endpoint: subscription.endPoint,
          keys: subscription.keys,
        },
        payload
      )
      .catch((error) => {
        console.error("Notification error:", error);
      });
  });
};
