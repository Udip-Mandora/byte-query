import QuestionCard from "@/components/Questions/QuestionCard";
import { getQuestionById } from "@/use-cases/question-service";
import { notFound } from "next/navigation";
<<<<<<< HEAD
import { AnswerForm } from "@/app/new-question/answerForm";
=======
import AnswerQuestion from "./AnswerQuestion/AnswerQuestion";

>>>>>>> 4863f1c2e102620673c533f5b2f37d3b384ccbe5
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }
  const question = await getQuestionById(id);
  return (
    <div className="flex flex-col gap-2 w-full p-12">
      <QuestionCard question={question} />
<<<<<<< HEAD

      <h2 className="text-xl font-semibold">Your Answer</h2>
      <AnswerForm questionId={id as string} userId={id} />
=======
      <AnswerQuestion questionId={question.id} />
>>>>>>> 4863f1c2e102620673c533f5b2f37d3b384ccbe5
    </div>
  );
}
