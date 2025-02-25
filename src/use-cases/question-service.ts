/**
 * gets all the questions irrespective of who posted it .
 *
 * @returns a list of all questions.
 */
export function getAllQuestions(): Promise<
  {
    id: string;
    title: string;
    content: string;
    upVotes: number | string;
    downVotes: number | string;
    noOfAnswers: number | string;
    tags: [string];
    userName: string;
    date: Date;
  }[]
> {
  return;
}

/**
 * gets all the questions posted by a specific user .
 *
 * @param {string} userId id of user who posted questions
 *
 * @returns a list of all questions posted by a user.
 */
export function getAllQuestionsByUser(userId: string): Promise<
  {
    id: string;
    title: string;
    content: string;
    upVotes: number | string;
    downVotes: number | string;
    noOfAnswers: number | string;
    tags: [string];
    userName: string;
    date: Date;
  }[]
> {
  return;
}

/**
 * gets all the questions posted by current user .
 *
 * @returns a list of all questions posted by current user.
 */
export function getAllQuestionsByCurrentUser(userId: string): Promise<
  {
    id: string;
    title: string;
    content: string;
    upVotes: number | string;
    downVotes: number | string;
    noOfAnswers: number | string;
    tags: [string];
    userName: string;
    date: Date;
  }[]
> {
  return;
}
