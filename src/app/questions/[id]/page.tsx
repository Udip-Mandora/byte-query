import QuestionCard from "@/components/Questions/QuestionCard";
import { getQuestionById } from "@/use-cases/question-service";
import { notFound } from "next/navigation";
import AnswerQuestion from "./AnswerQuestion/AnswerQuestion";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllAnswers } from "@/use-cases/answer-service";
import AnswerList from "@/components/Answers/AnswerList";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = await session?.user;
  if (!user) {
    return notFound();
  }
  const question = await getQuestionById(id);
  const answers = await getAllAnswers(question.id);
  return (
    <div className="flex flex-col gap-2 w-full p-12">
      <QuestionCard question={question} />
      <AnswerList answers={answers} />
      <AnswerQuestion questionId={question.id} userId={user.id} />
    </div>
  );
}
