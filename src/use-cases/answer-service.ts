import { answerGetAllByQuestionId } from "@/data-access/answers";

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
