import { createSchema } from "monarch-orm";
import { object, string } from "monarch-orm/types";

export const NotificationSchema = createSchema("subscriptions", {
  endPoint: string(),
  keys: object({ p256dh: string(), auth: string() }),
});
