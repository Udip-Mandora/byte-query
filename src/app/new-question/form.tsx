"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type QuestionFormData = {
  title: string;
  description: string;
  tags?: string;
};

type AnswerFormData = {
  answer: string;
};

interface AskQuestionFormProps {
  onSubmit: (data: QuestionFormData) => void;
}

interface AnswerQuestionFormProps {
  onSubmit: (data: AnswerFormData) => void;
}

const questionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  tags: z.string().optional(),
});

const answerSchema = z.object({
  answer: z.string().min(10, "Answer must be at least 10 characters"),
});

export function AskQuestionForm({ onSubmit }: AskQuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Title" {...register("title")} />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <Textarea placeholder="Description" {...register("description")} className="h-64" />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <Input placeholder="Tags (comma separated)" {...register("tags")} />
      {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}

      <Button type="submit">Post Question</Button>
    </form>
  );
}

export function AnswerQuestionForm({ onSubmit }: AnswerQuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea placeholder="Your Answer" {...register("answer")} />
      {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}

      <Button type="submit">Post Answer</Button>
    </form>
  );
}
