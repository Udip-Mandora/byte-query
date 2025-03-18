import QuestionCard from "@/components/Questions/QuestionCard";
import { getQuestionById } from "@/use-cases/question-service";
import { notFound } from "next/navigation";
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

      <h2 className="text-xl font-semibold">Your Answer</h2>
      <AnswerForm questionId={id as string} userId={id} />
    </div>
  );
}
