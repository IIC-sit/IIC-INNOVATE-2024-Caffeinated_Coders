import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://users_owner:d6DurImpfcj1@ep-proud-glade-a8ezb873.eastus2.azure.neon.tech/test%20database?sslmode=require"
);
export const db = drizzle(sql, { schema });
