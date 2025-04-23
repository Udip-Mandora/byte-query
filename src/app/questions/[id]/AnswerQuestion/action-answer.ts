"use server";

import { answersUpdateOneById, answerGetOneById } from "@/data-access/answers";
import { db } from "@/drizzle/db";
import { AnswerTable } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

export async function submitAnswer({
    content,
    questionId,
    userId,
    upVote,
    downVote,
}: {
    content: string;
    questionId: string;
    userId: string;
    upVote: number;
    downVote: number;
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

// export async function updateVotes({
//     upVote,
//     downVote,
// }: {
//     upVote: number,
//     downVote: number,
// }) {
//     try {
//         const [answer] = await answersUpdateOneById(upVote, downVote);
//     } catch (error) {
//         console.error("Error updating votes: ", error);
//         return { success: false, error: "Failed to update vote" }
//     }
// };

export async function updateVotes({
    answerId,
    type,
}: {
    answerId: string;
    type: "up" | "down";
}) {
    try {
        const fieldToUpdate = type === "up" ? "upVote" : "downVote";

        // Fetch current value (optional but safer)
        const answer = await answerGetOneById(answerId);
        const current = answer?.[fieldToUpdate] ?? 0;

        const updatedAnswer = await answersUpdateOneById(answerId, {
            [fieldToUpdate]: current + 1,
        });

        return { success: true, data: updatedAnswer };
    } catch (error) {
        console.error("Error updating votes: ", error);
        return { success: false, error: "Failed to update vote" };
    }
}
