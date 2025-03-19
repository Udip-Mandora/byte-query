"use client";
import { AnswerQuestionForm } from "@/app/new-question/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnswerForm } from "./answerForm";
export default function AnswerQuestion({
  questionId,
  userId,
}: {
  questionId: string;
  userId: string;
}) {
  const [answerQuestion, setAnswerQuestion] = useState(false);
  const handleSubmit = async () => {};
  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          setAnswerQuestion((prev) => !prev);
        }}
        size={"sm"}
        className="flex max-w-32"
      >
        Add Answer
      </Button>
      {answerQuestion && <AnswerForm questionId={questionId} userId={userId} />}
    </div>
  );
}
