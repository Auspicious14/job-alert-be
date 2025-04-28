import { createDatabase } from "monarch-orm";
import { client } from "./db.config";
import { JobSchema } from "../models/jobs";

export const { db, collections } = createDatabase(client.db(), {
  jobs: JobSchema,
});
