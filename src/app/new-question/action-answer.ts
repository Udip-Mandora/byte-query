// import { redirect } from "next/navigation";
// import { AnswerForm } from "./answer-form";
// import { answerSchema } from "./answer-form";

// export async function createAnswer(data: AnswerForm){
//     const parsed = answerSchema.safeParse(data);
//     if(!parsed.success){
//         return {error: parsed.error.format()}; // Return Structured Validation
//     }
//     //pass that data to this function\
//     try{
//         const result = await createAnswer()
//     }
// }

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
