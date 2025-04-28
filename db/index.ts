import { createDatabase } from "monarch-orm";
import { client } from "./db.config";
import { JobSchema } from "../models/jobs";
import { UserSchema } from "../models/user";
import { NotificationSchema } from "../models/notification";

export const { db, collections } = createDatabase(client.db(), {
  jobs: JobSchema,
  users: UserSchema,
  notification: NotificationSchema,
});
