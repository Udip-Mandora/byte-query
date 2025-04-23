"use server";

import { voteOnAnswerDB } from "@/data-access/votes";

export async function voteOnAnswerAction({
    answerId,
    userId,
    voteType,
}: {
    answerId: string;
    userId: string;
    voteType: "up" | "down";
}) {
    try {
        const result = await voteOnAnswerDB({ answerId, userId, voteType });
        return result;
    } catch (error) {
        console.error("Vote failed:", error);
        return { success: false, message: "Something went wrong." };
    }
}
