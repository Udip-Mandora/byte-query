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
    <div className={"flex items-center flex-col space-y-4 m-12"}>
      {user && user && user.name ? (
        <>
          <h1 className="mx-auto text-3xl font-bold">Hello {user.name} !</h1>
          <h2 className="mx-auto text-xl font-bold">Welcome to Byte Query! </h2>
        </>
      ) : (
        <h1 className="mx-auto text-3xl font-bold">Welcome to Byte Query</h1>
      )}
      {questions && questions.length > 0 && (
        <QuestionList questions={questions} />
      )}
    </div>
  );
}
