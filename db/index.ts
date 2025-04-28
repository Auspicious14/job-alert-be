import { createDatabase } from "monarch-orm";
import { client } from "./db.config";
import { JobSchema } from "../models/jobs";
import { UserSchema } from "../models/user";

export const { db, collections } = createDatabase(client.db(), {
  jobs: JobSchema,
  users: UserSchema,
});
