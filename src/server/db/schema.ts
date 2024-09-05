import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `wishing-well_${name}`);

export const wishlists = createTable(
  "wishlist",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", { length: 512 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (wishlist) => ({
    nameIndex: index("name_idx").on(wishlist.name),
  }),
);

export const products = createTable("product", {
  id: serial("id").primaryKey(),
  wishlistId: serial("wishlist_id").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }),
  url: varchar("url", { length: 512 }),
  imageUrl: varchar("image_url", { length: 512 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const wishlistsRelations = relations(wishlists, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [products.wishlistId],
    references: [wishlists.id],
  }),
}));
