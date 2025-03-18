"use server";

import { db } from "@/drizzle/db";
import { AnswerTable } from "@/drizzle/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const answerSchema = z.object({
    content: z.string().min(10, "Answer must be at least 10 characters"),
    userId: z.string(),
    questionId: z.string(),
});

export async function submitAnswer(formData: FormData) {
    const data = {
        content: formData.get("content") as string,
        userId: formData.get("userId") as string,
        questionId: formData.get("questionId") as string,
    };

    const parsedData = answerSchema.safeParse(data);
    if (!parsedData.success) {
        return { error: parsedData.error.format() };
    }

    await db.insert(AnswerTable).values({
        content: parsedData.data.content,
        userId: parsedData.data.userId,
        questionId: parsedData.data.questionId,
        upVote: 0,
        downVote: 0,
    });

    revalidatePath("/questions/" + parsedData.data.questionId);

    return { success: "Answer submitted successfully" };
}
