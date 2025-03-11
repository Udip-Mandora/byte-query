"use server";
import { db } from "@/drizzle/db";
import { AnswerTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Get an answer form database by id.
 * @param {string} id of the answer
 *
 * @returns An answer object or undefined
 */
export async function answerGetOneById(id: string): Promise<
  | {
      id: string;
      content: string | null;
      userId: string;
      questionId: string;
      upVote: number;
      downVote: number;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | undefined
> {
  const answer = await db.query.AnswerTable.findFirst({
    where: eq(AnswerTable.id, id),
  });
  return answer;
}

/**
 * Get an answer form database by questionId.
 * @param {string} questionId of the answer
 *
 * @returns An answer object or undefined
 */
export async function answerGetOneByQuestionId(questionId: string): Promise<
  | {
      id: string;
      content: string | null;
      userId: string;
      questionId: string;
      upVote: number;
      downVote: number;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | undefined
> {
  const answer = await db.query.AnswerTable.findFirst({
    where: eq(AnswerTable.questionId, questionId),
  });
  return answer;
}

/**
 * Get an answer form database by userId.
 * @param {string} userId of the answer
 *
 * @returns An answer object or undefined
 */
export async function answerGetOneByUserId(userId: string): Promise<
  | {
      id: string;
      content: string | null;
      userId: string;
      questionId: string;
      upVote: number;
      downVote: number;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  | undefined
> {
  const answer = await db.query.AnswerTable.findFirst({
    where: eq(AnswerTable.userId, userId),
  });
  return answer;
}

/**
 * Create a new answer in database
 * @returns {string} id of newly created answer.
 */
export async function answerCreateOne(data: {
  content: string;
  userId: string;
  questionId: string;
  upVote: number;
  downVote: number;
}): Promise<{ id: string }> {
  const [answer] = await db
    .insert(AnswerTable)
    .values(data)
    .returning({ id: AnswerTable.id });
  return answer;
}

/**
 * Get all answers from db
 *
 * @return all answers from db
 */
export async function answersGetAll(): Promise<
  {
    id: string;
    content: string | null;
    userId: string;
    questionId: string;
    upVote: number;
    downVote: number;
  }[]
> {
  const answers = await db.query.AnswerTable.findMany();
  return answers;
}

export async function answersGetCountByQuestionId(questionId: string) {
    
}
