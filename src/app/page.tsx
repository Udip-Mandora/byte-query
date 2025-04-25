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
    <div
      className={"flex items-center flex-col gap-8 m-12 mx-auto max-w-7xl"}
    >
      {user && user && user.name ? (
        <>
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
            Hello {user.name} !
          </h1>
          <h2 className="relative z-10 mx-auto max-w-4xl text-center text-lg font-bold text-slate-700 md:text-xl lg:text-3xl dark:text-slate-300">
            Welcome to Byte Query!{" "}
          </h2>
        </>
      ) : (
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          Welcome to Byte Query!
        </h1>
      )}
      {questions && questions.length > 0 && (
        <QuestionList questions={questions} />
      )}
    </div>
  );
}
