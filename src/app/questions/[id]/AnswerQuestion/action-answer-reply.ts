// use-cases/answer-reply-service.ts
"use server";

import { answerReplyByUserId, answerReplyGetOneById, answerReplyCreateOne } from "@/data-access/answerReply";
import { db } from "@/drizzle/db";
import { AnswerRepliesTable } from "@/drizzle/schema";

// export async function postReplyToAnswer(answerId: string, userId: string, content: string) {
//     if (!content.trim())
//         throw new Error("Reply content cannot be empty.");
//     return answerReplyCreateOne({ answerId, userId, content });
// }

// export async function fetchRepliesForAnswer(answerId: string) {
//     return answerReplyGetOneById(answerId);
// }

export async function submitAnswerReply({
    userId,
    answerId,
    content
}: {
    userId: string
    answerId: string;
    content: string;
}) {
    try {
        const [answerReply] = await db
            .insert(AnswerRepliesTable)
            .values({
                userId,
                answerId,
                content
            })
            .returning({ id: AnswerRepliesTable.id });

        return { success: true, id: answerReply.id };
    } catch (error) {
        console.error("Error Submitting Answer Reply: ", error);
        return { success: false, error: "Failed to Submit Answer Reply" };
    }
}