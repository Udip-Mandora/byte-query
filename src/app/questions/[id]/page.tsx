import QuestionCard from "@/components/Questions/QuestionCard";
import { getQuestionById } from "@/use-cases/question-service";
import { notFound } from "next/navigation";
import AnswerQuestion from "./AnswerQuestion/AnswerQuestion";
import { AnswerForm } from "@/app/new-question/answerForm";
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
      <AnswerQuestion questionId={question.id as string} />
    </div>
  );
}
