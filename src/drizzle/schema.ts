import { Many, relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
});
export const QuestionTable = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const AnswerTable = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content"),
  userId: text("user_id")
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
  name: varchar("name", { length: 255 }).notNull().unique(),
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

export const SessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
});

export const AccountTable = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const VerificationTable = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const VotesTable = pgTable(
  "votes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    answerId: uuid("answer_id")
      .notNull()
      .references(() => AnswerTable.id, { onDelete: "cascade" }),
    upVote: boolean("upVote").notNull(),
    downVote: boolean("downVote").notNull(),
  },
  (votes) => ({
    uniqueUserAnswerVote: unique().on(votes.userId, votes.answerId),
  })
);

export const AnswerRepliesTable = pgTable("answer_replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  answerId: uuid("answer_id")
    .notNull()
    .references(() => AnswerTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const questionRelations = relations(QuestionTable, ({ one, many }) => ({
  asker: one(UserTable, {
    fields: [QuestionTable.userId],
    references: [UserTable.id],
  }),
  tags: many(QuestionTagTable),
  answers: many(AnswerTable),
}));
export const tagsRelations = relations(TagTable, ({ many }) => ({
  questions: many(QuestionTagTable),
}));
export const questionTagsRelations = relations(QuestionTagTable, ({ one }) => ({
  question: one(QuestionTable, {
    fields: [QuestionTagTable.questionId],
    references: [QuestionTable.id],
  }),
  tag: one(TagTable, {
    fields: [QuestionTagTable.tagId],
    references: [TagTable.id],
  }),
}));
export const answerRelation = relations(AnswerTable, ({ one,many }) => ({
  question: one(QuestionTable, {
    fields: [AnswerTable.questionId],
    references: [QuestionTable.id],
  }),
  replies: many(AnswerRepliesTable),
}));
export const answerRepliesRelation = relations(
  AnswerRepliesTable,
  ({ one }) => ({
    answer: one(AnswerTable, {
      fields: [AnswerRepliesTable.answerId],
      references: [AnswerTable.id],
    }),
  })
);
