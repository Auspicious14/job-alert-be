import { createDatabase, createSchema } from "monarch-orm";
import { number, string, literal, date } from "monarch-orm/types";
import { client } from "../../db/db.config";

export const JobSchema = createSchema("jobs", {
  title: string(),
  location: string(),
  company: string(),
  link: string(),
  // level: literal("entry", "mid", "senior"),
  // model: literal("hybrid, remote, onsite"),
  source: string(),
  createdAt: date(),
  updatedAt: date(),
});

export interface IJob {
  title: string;
  company: string;
  location: string;
  link: string;
  source: string;
}
[];
