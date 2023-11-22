import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 50 }).notNull().unique(),
  },
  (table) => ({
    usenameIndex: index("username_index").on(table.username),
  }),
);

export const unsentState = pgEnum("state", ["me","everyone"]);
export const messagesTable = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    chatroomId: integer("chatroom_id")
      .notNull()
      .references(() => friendsTable.id, {
        onDelete: "cascade",
      }),
    content: varchar("content", { length: 280 }).notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
    authorName: varchar("author_name", { length: 50 })
      .notNull()
      .references(() => usersTable.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    friendName: varchar("friend_name", { length: 50 })
      .notNull()
      .references(() => usersTable.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    unsentState: unsentState("state"),
  },
  (table) => ({
    chatroomIdIndex: index("chatroom_id_index").on(table.chatroomId),
    authorNameIndex: index("user_name_index").on(table.authorName),
    friendNameIndex: index("friend_name_index").on(table.friendName),
    createdAtIndex: index("created_at_index").on(table.createdAt),
  }),
);


export const friendsTable = pgTable(
  "friend",
  {
    id: serial("id").primaryKey(),
    userName: varchar("user_name", { length: 50 })
      .notNull()
      .references(() => usersTable.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    friendName: varchar("friend_name", { length: 50 })
      .notNull()
      .references(() => usersTable.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    latest: timestamp("latest").default(sql`now()`),
    notification:  varchar("notification", { length: 280 }).default(""),
  },
  (table) => ({
    friendIndex: index("friend_index").on(
      table.userName,
      table.friendName,
    ),
    latestIndex: index("latest_index").on(table.latest),
  }),
);


