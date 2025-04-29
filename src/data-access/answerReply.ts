import { db } from "@/drizzle/db";
import { AnswerRepliesTable } from "@/drizzle/schema";
import { UUID } from "crypto";
import { eq } from "drizzle-orm";

/**
 * Get an answer reply from database by id
 * @param {string} id of the answer
 * 
 * @returns An answer object or defined 
 */
export async function answerReplyGetOneById(id: string): Promise<
    | {
        id: string;
        userId: string;
        answerId: string;
        content: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[] | undefined
> {
    const answerReply = await db.query.AnswerRepliesTable.findMany({
        where: eq(AnswerRepliesTable.id, id),
    });
    return answerReply;
}

/**
 * Get an answer reply from database by userId
 * @param {string} userId of the answer
 * 
 * @returns An answer object or defined 
 */
export async function answerReplyByUserId(userId: string): Promise<
    | {
        id: string;
        userId: string;
        answerId: string;
        content: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[] | undefined
> {
    const answerReply = await db.query.AnswerRepliesTable.findMany({
        where: eq(AnswerRepliesTable.userId, userId)
    })
    return answerReply;
}

/**
 * Create a new answer reply in database
 * @returns {string} id of newly created answer reply.
 */
export async function answerReplyCreateOne(data: {
    userId: string;
    answerId: string;
    content: string;
}): Promise<{ id: string }> {
    const [answerReply] = await db
        .insert(AnswerRepliesTable)
        .values(data)
        .returning({ id: AnswerRepliesTable.id });
    return answerReply;
}