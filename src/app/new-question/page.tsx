"use client";
import { AskQuestionForm } from "./form";
export default function Page() {
  return (
    <div className="mx-12 mt-6 flex flex-col gap-4">
      <span className="text-4xl font-bold">Ask your question.</span>
      <AskQuestionForm></AskQuestionForm>
    </div>
  );
}
