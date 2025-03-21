"use server";

import { db } from "@/drizzle/db";
import { AnswerTable } from "@/drizzle/schema";

export async function submitAnswer({
    content,
    questionId,
    userId,
}: {
    content: string;
    questionId: string;
    userId: string;
}) {
    try {
        const [answer] = await db
            .insert(AnswerTable)
            .values({
                content,
                questionId,
                userId,
                upVote: 0,
                downVote: 0,
            })
            .returning({ id: AnswerTable.id });

        return { success: true, id: answer.id };
    } catch (error) {
        console.error("Error submitting answer:", error);
        return { success: false, error: "Failed to submit answer." };
    }
}
