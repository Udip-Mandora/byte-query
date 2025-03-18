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
    createdAt: Date | null;
    updatedAt: Date | null;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Answers:</span>
      {answers &&
        answers.length > 0 &&
        answers.map((answer) => <AnswerCard key={answer.id} answer={answer} />)}
    </div>
  );
}
