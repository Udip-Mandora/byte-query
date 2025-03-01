import { questionsGetAll, questionGetByOneUserId } from "@/data-access/questions";
/**
 * gets all the questions irrespective of who posted it .
 *
 * @returns a list of all questions.
 */
export async function getAllQuestions(id?: string) {
  const question = await questionsGetAll(id as string);
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
  const question = await questionGetByOneUserId(userId);
  return question;
}

/**
 * gets all the questions posted by current user .
 *
 * @returns a list of all questions posted by current user.
 */
export async function getAllQuestionsByCurrentUser(userId: string) {
  if (!userId) {
    throw new Error("User ID Required");
  }
  const question = await questionsGetAll(userId);
  return question;
}
