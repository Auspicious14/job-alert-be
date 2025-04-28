import { createSchema } from "monarch-orm";
import { string, date } from "monarch-orm/types";

export interface IUser {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = createSchema("users", {
  email: string(),
  password: string(),
  createdAt: date(),
  updatedAt: date(),
});
