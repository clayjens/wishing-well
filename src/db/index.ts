import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";
import { env } from "@/env";

export const client = postgres(env.DATABASE_URL);
const db = drizzle(client, { schema });
export default db;
