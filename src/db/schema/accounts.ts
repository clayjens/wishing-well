import {
  integer,
  pgTable,
  primaryKey,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

import { users } from "@/db/schema/users";

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type").$type<AdapterAccountType>().notNull(),
    provider: varchar("provider").notNull(),
    providerAccountId: varchar("provider_account_id").notNull(),
    refreshToken: varchar("refresh_token"),
    accessToken: varchar("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type"),
    scope: varchar("scope"),
    idToken: varchar("id_token"),
    sessionState: varchar("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
