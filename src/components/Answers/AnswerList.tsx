import AnswerCard from "./AnswerCard";

export default function AnswerList({
  answers,
}: {
  answers: {
    id: string;
    content: string | null;
    userId: string;
    questionId: string;
    upVote: number;
    downVote: number;
    replies: {
      id: string;
      userId: string;
      answerId: string;
      content: string;
      createdAt: Date | null;
      updatedAt: Date | null;
    }[];
    createdAt: Date | null;
    updatedAt: Date | null;
  }[];
}) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <span className="text-md font-semibold">{answers.length} Answers:</span>
      {answers &&
        answers.length > 0 &&
        answers.map((answer) => <AnswerCard key={answer.id} answer={answer} />)}
    </div>
  );
}
