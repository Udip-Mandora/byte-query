"use client";
import { AskQuestionForm } from "./form";
export default function Page() {
  return (
    <div className="mx-12 mt-6 flex flex-col gap-8 mx-auto max-w-7xl">
     <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
            Ask your question
          </h1>
      <AskQuestionForm />
    </div>
  );
}
