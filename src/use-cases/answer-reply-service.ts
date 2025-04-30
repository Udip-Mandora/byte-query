import { answerReplyGetOneById, answerReplyByUserId, answerReplyCreateOne } from "@/data-access/answerReply";

export async function getAllAnswerReplies(answerId: string): Promise<
    {
        id: string;
        userId: string;
        answerId: string;
        content: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]
> {
    try {
        const answerReply = await answerReplyGetOneById(answerId);
        if (!answerReply) {
            throw new Error("answer reply not found");
        }
        return answerReply;
    } catch (error) {
        console.log(error);
        throw error;
    }
}