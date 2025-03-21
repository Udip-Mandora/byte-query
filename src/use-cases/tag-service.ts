"use server";
import { tagGetAllByQuestionId, tagsCreateOne } from "@/data-access/tags";

export async function getAllTags(questionId: string): Promise<{
    id: string;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}[]
> {
    try {
        const tags = await tagGetAllByQuestionId(questionId);
        if (!tags) {
            throw new Error("Tags not found");
        }
        return tags;
    } catch (error) {
        console.error(error);
        throw error;
    }
}