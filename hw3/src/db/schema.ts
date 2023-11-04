import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayName: varchar("display_name", { length: 50 }).notNull().unique(),
  },
  (table) => ({
    diaplayNameIndex: index("displayName_index").on(table.displayName),
  }),
);

export const activitiesTable = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 280 }).notNull(),
    username: varchar("user_name", { length: 50 })
      .notNull()
      .references(() => usersTable.displayName, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: timestamp("created_at").default(sql`now()`),
    startDate: varchar("startDate", { length: 15 }).notNull(),
    endDate: varchar("endDate", { length: 15 }).notNull(),
  },
  (table) => ({
    userNameIndex: index("user_name_index").on(table.username),
    createdAtIndex: index("created_at_index").on(table.createdAt),
  }),
);

export const participantsTable = pgTable(
  "participants",
  {
    id: serial("id").primaryKey(),
    username: varchar("user_handle", { length: 50 })
      .notNull()
      .references(() => usersTable.displayName, { onDelete: "cascade" }),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activitiesTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    activityIdIndex: index("activity_id_index").on(table.activityId),
    userNameIndex: index("user_name_index").on(table.username),
    uniqCombination: unique().on(table.username, table.activityId),
  }),
);

export const commentsTable = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 280 }).notNull(),
    username: varchar("user_name", { length: 50 })
      .notNull()
      .references(() => usersTable.displayName, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: timestamp("created_at").default(sql`now()`),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activitiesTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    activityIdIndex: index("activity_id_index").on(table.activityId),
    userNameIndex: index("user_name_index").on(table.username),
    createdAtIndex: index("created_at_index").on(table.createdAt),
  }),

);


export const TimeTable = pgTable(
  "time",
  {
    id: serial("id").primaryKey(),
    username: varchar("user_handle", { length: 50 })
      .notNull()
      .references(() => usersTable.displayName, { onDelete: "cascade" }),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activitiesTable.id, { onDelete: "cascade" }),
    timeStaterows: integer("rows").notNull(),
    timeStatecols: integer("cols").notNull(),
  },
  (table) => ({
    activityIdIndex: index("activity_id_index").on(table.activityId),
    userNameIndex: index("user_name_index").on(table.username),
  }), 
)