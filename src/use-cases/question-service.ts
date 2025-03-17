"use service";
import {
  questionGetAllByUserId,
  questionsGetAllWithDetails,
  questionCreateOne,
  questionsGetOneWithDetailsById,
} from "@/data-access/questions";
import { getCurrentUser } from "./user-service";
import { tagGetAll } from "@/data-access/tags";
/**
 * gets all the questions irrespective of who posted it .
 *
 * @returns a list of all questions.
 */
export async function getAllQuestions() {
  const question = await questionsGetAllWithDetails();
  return question;
}

/**
 * gets all the questions posted by a specific user .
 *
 * @param {string} userId id of user who posted questions
 *
 * @returns a list of all questions posted by a user.
 */
export async function getAllQuestionsByUser(userId: string) {
  const question = await questionGetAllByUserId(userId);
  return question;
}

/**
 * gets all the questions posted by current user .
 *
 * @returns a list of all questions posted by current user.
 */
export async function getAllQuestionsByCurrentUser() {
  try {
    const user = await getCurrentUser();
    const question = await getAllQuestionsByUser(user.id);
    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Creates a new question
 *
 * @param {string} content content of the question
 * @param {string} title title of the question
 *
 * @returns id of the new question
 * */
export async function createNewQuestion(
  title: string,
  content: string,
): Promise<{ id: string }> {
  try {
    const user = await getCurrentUser();
    const newQuestionID = questionCreateOne({
      title: title,
      content: content,
      userId: user.id,
    });
    return newQuestionID;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionById(id: string): Promise<{
  createdAt: Date | null;
  updatedAt: Date | null;
  id: string;
  content: string;
  title: string;
  userId: string;
  tags: {
    tag: {
      name: string;
    };
  }[];
  asker: {
    name: string;
    image: string | null;
  };
}> {
  const question = await questionsGetOneWithDetailsById(id);
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
}
