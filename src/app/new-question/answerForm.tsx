"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { submitAnswer } from "@/app/questions/[id]/AnswerQuestion/action-answer";

const answerSchema = z.object({
    content: z.string().min(10, "Answer must be at least 10 characters"),
    questionId: z.string(),
    userId: z.string(),
});

export function AnswerForm({ questionId, userId }: { questionId: string; userId: string }) {
    const { handleSubmit, setValue, formState: { errors } } = useForm<{
        content: string;
        questionId: string;
        userId: string;
    }>({
        resolver: zodResolver(answerSchema),
        defaultValues: {
            questionId,
            userId,
        },
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        onUpdate: ({ editor }) => {
            setValue("content", editor.getHTML());
        },
    });

    const onSubmit = async (data: { content: string }) => {
        await submitAnswer({ content: data.content, questionId, userId });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-semibold">Your Answer</h2>
            {!editor ? (
                <p>Loading editor...</p>
            ) : (
                <div className="border p-2 rounded-md">
                    <EditorContent editor={editor} className="min-h-[150px]" />
                </div>
            )}
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Post Answer
            </Button>
        </form>
    );
}
