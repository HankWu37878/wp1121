import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["google", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const productTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    productName: varchar("product_name", { length: 100 }).notNull().unique(),
    productDescription: varchar("product_description", {
      length: 300,
    }).notNull(),
    sellerdisplayId: uuid("seller_display_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }), 
  },
  (table) => ({
    productNameIndex: index("display_id_index").on(table.displayId),
    sellerDiaplayIndex: index("email_index").on(table.sellerdisplayId),
  }),
);

export const productRelations = relations(productTable, ({ many }) => ({
  productToProductDetailTable: many(productToProductDetailTable),
}));

export const productDetailTable = pgTable(
  "products_detail",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    productQuantity: integer("product_quantity").notNull(),
    productSold: integer("product_sold").default(0),
    productPrice: varchar("product_price", { length: 20 }).notNull(),
    productImageLink: varchar("product_image_link").notNull(),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productStyle: varchar("product_style", { length: 20 }).notNull(),
  },
  (table) => ({
    productNameIndex: index("display_id_index").on(table.displayId),
    uniqCombination: unique().on(table.productId, table.productStyle),
  }),
);

export const productDetailRelations = relations(productTable, ({ many }) => ({
  productToProductDetailTable: many(productToProductDetailTable),
}));

export const productToProductDetailTable = pgTable(
  "product_to_product_detail",
  {
    id: serial("id").primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productDetailId: uuid("product_detail_id")
      .notNull()
      .references(() => productDetailTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    productIdIndex: index("product_id_index").on(table.productId),
    productDetailIdIndex: index("product_detail_id_index").on(
      table.productDetailId,
    ),
  }),
);

export const productToProductDetailRelations = relations(
  productToProductDetailTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productToProductDetailTable.productId],
      references: [productTable.displayId],
    }),
    productDetail: one(productDetailTable, {
      fields: [productToProductDetailTable.productDetailId],
      references: [productDetailTable.displayId],
    }),
  }),
);

export const commentsTable = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    content: varchar("content", { length: 280 }).notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: timestamp("created_at").default(sql`now()`),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, { onDelete: "cascade" }),
    rate: integer("comment_rate").notNull(),
  },
  (table) => ({
    productIdIndex: index("product_id_index").on(table.productId),
    userIdIndex: index("user_id_index").on(table.userId),
    createdAtIndex: index("created_at_index").on(table.createdAt),
  }),
);

export const productToCommentRelations = relations(
  commentsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [commentsTable.userId],
      references: [usersTable.displayId],
    }),
    product: one(productTable, {
      fields: [commentsTable.productId],
      references: [productTable.displayId],
    }),
  }),
);

export const cartsTable = pgTable(
  "carts",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    productDetailId: uuid("product_detail_id")
      .notNull()
      .references(() => productDetailTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, { onDelete: "cascade" }),
    buyQuantity: integer("buy_quantity").default(1).notNull(),
  },
  (table) => ({
    productDetailIdIndex: index("product_detail_id_index").on(
      table.productDetailId,
    ),
    buyerDiaplayIndex: index("buyer_index").on(table.userId),
    productIdIndex: index("product_id_index").on(table.productId),
  }),
);

export const productToCartsRelations = relations(cartsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [cartsTable.userId],
    references: [usersTable.displayId],
  }),
  product: one(productTable, {
    fields: [cartsTable.productId],
    references: [productTable.displayId],
  }),
  productDetail: one(productDetailTable, {
    fields: [cartsTable.productDetailId],
    references: [productDetailTable.displayId],
  }),
}));
