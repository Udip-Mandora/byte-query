import { db } from "@/drizzle/db"; // database connection
import { AnswerTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { answerId, voteType } = await req.json();

        if (!answerId || !["upVote", "downVote"].includes(voteType)) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Update the corresponding vote count
        await db
            .update(AnswerTable)
            .set({
                [voteType]: AnswerTable[voteType] + 1, // Increment upVote or downVote
            })
            .where(eq(AnswerTable.id, answerId));

        // Fetch updated counts
        const updatedAnswer = await db
            .select({
                upVote: AnswerTable.upVote,
                downVote: AnswerTable.downVote,
            })
            .from(AnswerTable)
            .where(eq(AnswerTable.id, answerId))
            .limit(1);

        return NextResponse.json(updatedAnswer[0]);
    } catch (error) {
        console.error("Error updating vote:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
