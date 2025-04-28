import { createClient, createDatabase } from "monarch-orm";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URL || "mongodb://localhost:27017";

export const client = createClient(URI);
