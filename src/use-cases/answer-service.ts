import { answerGetAllByQuestionId, updateVotes, updateDownVotes } from "@/data-access/answers";

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

export async function updateUpVotes(questionId: string): Promise<{
  questionId: string;
  upVote: number | 0;
  downVote: number | 0;
}[]> {
  try {
    const votes = await updateVotes(questionId);
    if (!votes) {
      throw new Error("VOtes are not updated");
    }
    return votes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}