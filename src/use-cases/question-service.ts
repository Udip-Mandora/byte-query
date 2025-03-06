import {
  questionsGetAll,
  questionGetAllByUserId,
  questionsGetAllWithDetails,
  questionCreateOne,
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
  content: string,
  title: string
): Promise<{ id: string }> {
  try {
    const user = await getCurrentUser();
    const newQuestionID = questionCreateOne({
      content: content,
      title: title,
      userId: user.id,
    });
    return newQuestionID;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
