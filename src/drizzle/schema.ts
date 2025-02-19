import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const QuestionTable = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content"),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const AnswerTable = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content"),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  questionId: uuid("question_id")
    .references(() => QuestionTable.id)
    .notNull(),
  upVote: integer("up_vote").notNull().default(0),
  downVote: integer("down_vote").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const TagTable = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const QuestionTagTable = pgTable("question_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("question_id")
    .references(() => QuestionTable.id)
    .notNull(),
  tagId: uuid("tag_id")
    .references(() => TagTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
