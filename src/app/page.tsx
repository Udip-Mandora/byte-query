import QuestionList from "@/components/Questions/QuestionList";
import { auth } from "@/lib/auth";
import { getAllQuestions } from "@/use-cases/question-service";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = await session?.user;
  const questions = await getAllQuestions();
  return (
    <div className={"flex items-center flex-col gap-24 p-8 mx-auto max-w-7xl"}>
      <h1 className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold md:text-2xl lg:text-3xl dark:text-slate-300">
        Welcome to ByteQuery
        {user && user && user.name && <>, {user.name}</>} !
      </h1>

      {questions && questions.length > 0 && (
        <QuestionList questions={questions} />
      )}
    </div>
  );
}
