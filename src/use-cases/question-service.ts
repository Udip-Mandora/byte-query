import { db } from "@/drizzle/db";
import { QuestionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
/**
 * gets all the questions irrespective of who posted it .
 *
 * @returns a list of all questions.
 */
export async function getAllQuestions(): Promise<
  {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
> {
  try {
    const data = await db.select().from(QuestionTable);
    const questions = data.map((q) => ({
      id: q.id,
      title: q.title,
      content: q.content,
      createdAt: q.createdAt ? new Date(q.createdAt) : new Date(),
      updatedAt: q.updatedAt ? new Date(q.updatedAt) : new Date(),
    }));
    return questions;
  } catch (error) {
    console.error("Error Fetching Question: ", error);
    return [];
  }
}

/**
 * gets all the questions posted by a specific user .
 *
 * @param {string} userId id of user who posted questions
 *
 * @returns a list of all questions posted by a user.
 */
export async function getAllQuestionsByUser(userId: string): Promise<
  {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
> {
  try {
    const result = await db.select().from(QuestionTable).where(eq(QuestionTable.userId, userId));
    const questions = result.map((q) => ({
      id: q.id,
      title: q.title,
      content: q.content,
      createdAt: q.createdAt ? new Date(q.createdAt) : new Date(),
      updatedAt: q.updatedAt ? new Date(q.updatedAt) : new Date(),
    }));
    return questions;
  } catch (error) {
    console.error("Error Fetching Question: ", error);
    return [];
  }
}

/**
 * gets all the questions posted by current user .
 *
 * @returns a list of all questions posted by current user.
 */
export async function getAllQuestionsByCurrentUser(userId: string): Promise<
  {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
> {
  if (!userId) {
    throw new Error("User ID is required to fetch questions");
  }
  try {
    const result = await db.select().from(QuestionTable).where(eq(QuestionTable.userId, userId));
    return result.map((q) => ({
      id: q.id,
      title: q.title,
      content: q.content,
      createdAt: q.createdAt ? new Date(q.createdAt) : new Date(),
      updatedAt: q.updatedAt ? new Date(q.updatedAt) : new Date(),
    }));
  } catch (error) {
    console.error("Error fetching current User's Questions: ", error);
    return [];
  }
}