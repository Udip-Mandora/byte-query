"use server";
import { db } from "@/drizzle/db";
import { QuestionTable, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Get a question form database by id.
 * @param {string} id of the question
 *
 * @returns Question object or undefined
 */
export async function quesionGetOneById(id: string): Promise<
  | {
      id: string;
      content: string | null;
      userId: string;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | undefined
> {
  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.id, id),
  });
  return question;
}

/**
 * Get a question from database by userId.
 * @param {string} userId of the question
 *
 * @returns Question object or undefined
 */
export async function questionGetAllByUserId(userId: string): Promise<
  | {
      id: string;
      content: string | null;
      userId: string;
      createdAt: Date | null;
      updatedAt: Date | null;
    }[]
  | undefined
> {
  const question = await db.query.QuestionTable.findMany({
    where: eq(QuestionTable.userId, userId),
  });
  return question;
}

/**
 * Create a new question in database
 * @returns {string} id of a newly created question.
 *
 */
export async function questionCreateOne(data: {
  title: string;
  content: string;
  userId: string;
}): Promise<{ id: string }> {
  const [question] = await db
    .insert(QuestionTable)
    .values(data)
    .returning({ id: QuestionTable.id });
  return question;
}

/**
 * Get all question from db
 *
 * @returns all question from db
 * */
export async function questionsGetAll(): Promise<
  {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    content: string;
    title: string;
    userId: string;
  }[]
> {
  const questions = await db.query.QuestionTable.findMany();
  return questions;
}
/**
 * Get all question from db
 *
 * @returns all question from db with related fields
 * */
export async function questionsGetAllWithDetails(): Promise<
  {
    createdAt: Date | null;
    updatedAt: Date | null;
    id: string;
    content: string;
    title: string;
    userId: string;
    tags: {
      tag: {
        name: string;
      };
    }[];
    asker: {
      name: string;
      image: string | null;
    };
  }[]
> {
  const questions = await db.query.QuestionTable.findMany({
    with: {
      asker: {
        columns: {
          name: true,
          image: true,
        },
      },
      tags: {
        columns: {
          id: false,
          tagId: false,
          questionId: false,
          createdAt: false,
          updatedAt: false,
        },
        with: {
          tag: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
  return questions;
}
/**
 * Get all question from db
 *
 * @returns all question from db with related fields
 * */
export async function questionsGetOneWithDetailsById(id: string): Promise<{
  createdAt: Date | null;
  updatedAt: Date | null;
  id: string;
  content: string;
  title: string;
  userId: string;
  tags: {
      tag: {
          name: string;
      };
  }[];
  asker: {
      name: string;
      image: string | null;
  };
} | undefined> {
  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.id, id),
    with: {
      asker: {
        columns: {
          name: true,
          image: true,
        },
      },
      tags: {
        columns: {
          id: false,
          tagId: false,
          questionId: false,
          createdAt: false,
          updatedAt: false,
        },
        with: {
          tag: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
  return question;
}
