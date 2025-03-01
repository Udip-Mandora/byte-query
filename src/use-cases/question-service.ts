import {
  questionsGetAll,
  questionGetAllByUserId,
} from "@/data-access/questions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getCurrentUser } from "./user-service";
/**
 * gets all the questions irrespective of who posted it .
 *
 * @returns a list of all questions.
 */
export async function getAllQuestions() {
  const question = await questionsGetAll();
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
