import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }).notNull(),
  image: varchar("image", { length: 2048 }).notNull(),
});
