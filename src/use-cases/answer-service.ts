import {
  answerGetAllByQuestionId,
  answersUpdateOneById,
} from "@/data-access/answers";
import { string } from "better-auth";

export async function getAllAnswers(questionId: string): Promise<
  {
    id: string;
    content: string | null;
    userId: string;
    questionId: string;
    upVote: number;
    downVote: number;
    createdAt: Date | null;
    updatedAt: Date | null;
  }[]
> {
  try {
    const answers = await answerGetAllByQuestionId(questionId);
    if (!answers) {
      throw new Error("answers not found");
    }
    return answers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUpVotes(
  id: string,
  upvotes: number
): Promise<{
  id: string;
  upVote: number | 0;
  downVote: number | 0;
}> {
  try {
    const updatedAnswer = await answersUpdateOneById(id, { upVote: upvotes });
    const result = {
      id: updatedAnswer.id,
      upVote: updatedAnswer.upVote,
      downVote: updatedAnswer.downVote,
    };
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
