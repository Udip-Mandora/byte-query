/**
 * Displays a question in a formatted card .
 * @param {string} title  title of the question.
 * @param {string} content  actual detailed question.
 * @param {string} tags  list of tags .
 * @param {string} upVotes  no of up votes.
 * @param {string} downVotes  no of down votes.
 * @param {string} noOfAnswers  no of answers.
 * @param {string} userName  username of the user who posted the question.
 * @param {string} date  date when question was asked .
 * 
 * @returns a card that with formatted data.
 * */
export default function QuestionCard({
  title,
  content,
  tags,
  upVotes,
  downVotes,
  noOfAnswers,
  userName,
  date
}: {
  title: string;
  content: string;
  tags: [string];
  upVotes: number|string;
  downVotes: number|string;
  noOfAnswers: number|string;
  userName: string;
  date:Date
}) {
  return <>question</>;
}
