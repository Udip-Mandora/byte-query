import QuestionCard from "./QuestionCard";

/**
 * 
 * @param questions - a list of questions
 * 
 * */ 
export default function QuestionList({
  questions,
}: {
  questions: {
    id: string;
    title: string;
    content: string;
    upVotes: number | string;
    downVotes: number | string;
    noOfAnswers: number | string;
    tags: [string];
    userName: string;
    date: Date;
  }[];
}) {
    return <>Questions</>
}