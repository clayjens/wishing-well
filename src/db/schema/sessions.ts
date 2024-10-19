import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "@/db/schema/users";

export const sessions = pgTable("session", {
  sessionToken: varchar("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
