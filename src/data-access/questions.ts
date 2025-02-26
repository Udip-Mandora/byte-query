import { db } from "@/drizzle/db";
import { QuestionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Get a question form database by id.
 * @param {string} id of the question
 * 
 * @returns Question object or undefined
 */
export async function quesionGetOneById(id: string): Promise<{
    id: string;
    content: string | null;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const question = await db.query.QuestionTable.findFirst({ where: eq(QuestionTable.id, id) });
    return question
}

/**
 * Get a question from database by userId.
 * @param {string} userId of the question
 * 
 * @returns Question object or undefined
 */
export async function questionGetByOneUserId(userId: string): Promise<{
    id: string;
    content: string | null;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
} | undefined> {
    const question = await db.query.QuestionTable.findFirst({ where: eq(QuestionTable.userId, userId) })
    return question
}

/**
 * Create a new question in database
 * @returns {string} id of a newly created question.
 * 
 */
export async function questionCreateOne(data: { content: string, userId: string }): Promise<{ id: string }> {
    const [question] = await db.insert(QuestionTable).values(data).returning({ id: QuestionTable.id })
    return question;
}