"use client";
import { AnswerQuestionForm } from "@/app/new-question/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function AnswerQuestion({ questionId }: { questionId: string }) {
  const [answerQuestion, setAnswerQuestion] = useState(false);
  const handleSubmit = async () => {};
  return (
    <div>
      <Button
        onClick={() => {
          setAnswerQuestion((prev) => !prev);
        }}
      >
        Add Answer
      </Button>
      {answerQuestion && <AnswerQuestionForm onSubmit={handleSubmit} />}
    </div>
  );
}
