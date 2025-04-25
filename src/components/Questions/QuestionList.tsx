import { Card, CardHeader, CardTitle } from "../ui/card";
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
  }[];
}) {
  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto gap-8">
      {questions &&
        questions.length > 0 &&
        questions.map((question) => (
          <QuestionCard key={question.id} question={question}/>
        ))}
    </div>
  );
}
