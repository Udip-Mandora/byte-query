import { db } from "@/drizzle/db";
import { VotesTable, AnswerTable } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

export async function voteOnAnswerDB({
    answerId,
    userId,
    voteType,
}: {
    answerId: string;
    userId: string;
    voteType: "up" | "down";
}) {
    const existingVote = await db.query.VotesTable.findFirst({
        where: and(eq(VotesTable.userId, userId), eq(VotesTable.answerId, answerId)),
    });

    if (existingVote) {
        const sameVote =
            (voteType === "up" && existingVote.upVote) ||
            (voteType === "down" && existingVote.downVote);

        if (sameVote) {
            // Remove vote
            await db.delete(VotesTable).where(eq(VotesTable.id, existingVote.id));
            await db
                .update(AnswerTable)
                .set({
                    upVote: voteType === "up"
                        ? sql`${AnswerTable.upVote} - 1`
                        : AnswerTable.upVote,
                    downVote: voteType === "down"
                        ? sql`${AnswerTable.downVote} - 1`
                        : AnswerTable.downVote,
                })
                .where(eq(AnswerTable.id, answerId));
            return { success: true, message: "Vote removed" };
        }

        // Switch vote
        await db.update(VotesTable)
            .set({
                upVote: voteType === "up",
                downVote: voteType === "down",
            })
            .where(eq(VotesTable.id, existingVote.id));

        await db.update(AnswerTable)
            .set({
                upVote: voteType === "up"
                    ? sql`${AnswerTable.upVote} + 1`
                    : sql`${AnswerTable.upVote} - 1`,
                downVote: voteType === "down"
                    ? sql`${AnswerTable.downVote} + 1`
                    : sql`${AnswerTable.downVote} - 1`,
            })
            .where(eq(AnswerTable.id, answerId));

        return { success: true, message: "Vote switched" };
    }

    // First-time vote
    await db.insert(VotesTable).values({
        userId,
        answerId,
        upVote: voteType === "up",
        downVote: voteType === "down",
    });

    await db.update(AnswerTable)
        .set({
            upVote: voteType === "up"
                ? sql`${AnswerTable.upVote} + 1`
                : AnswerTable.upVote,
            downVote: voteType === "down"
                ? sql`${AnswerTable.downVote} + 1`
                : AnswerTable.downVote,
        })
        .where(eq(AnswerTable.id, answerId));

    return { success: true, message: "Vote added" };
}
