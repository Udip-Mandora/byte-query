import QuestionCard from "@/components/Questions/QuestionCard";
import { getQuestionById } from "@/use-cases/question-service";
import { notFound } from "next/navigation";
import AnswerQuestion from "./AnswerQuestion/AnswerQuestion";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllAnswers } from "@/use-cases/answer-service";
import AnswerList from "@/components/Answers/AnswerList";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="flex flex-col gap-2 mx-auto max-w-7xl p-8">
      <div className="w-full flex flex-col gap-2 mx-auto">
        <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {question.title}
        </span>
        <span className="flex flex-row items-center justify-between text-sm font-normal text-foreground/60">
          <span>{question.createdAt?.toLocaleString()}</span>
          <span className="flex gap-1 items-center">
            <Avatar className="size-4 flex">
              {question.asker.image && (
                <AvatarImage src={question.asker.image} alt="User Image" />
              )}
              <AvatarFallback className="size-5">
                {question.asker.name[0]}
              </AvatarFallback>
            </Avatar>

            {question.asker.name}
          </span>
        </span>
        <p className="text-md font-normal text-foreground/80 my-4">
          {question.content}
        </p>
      </div>

      <AnswerList answers={answers} />
      <AnswerQuestion questionId={question.id} userId={user.id} />
    </div>
  );
}
