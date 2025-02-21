import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema";
import { SQL } from "bun";

const client = new SQL(process.env.DATABASE_URL!);
export const db = drizzle({ client,schema:schema });
