"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { submitAnswer } from "./action-answer";


const answerSchema = z.object({
    content: z.string().min(10, "Answer must be at least 10 characters"),
    questionId: z.string(),
    userId: z.string(),
    upVote: z.number().optional(),
    downVote: z.number().optional(),
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
        }
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        onUpdate: ({ editor }) => {
            setValue("content", editor.getHTML());
        },
    });

    const onSubmit = async (data: { content: string }) => {
        const result = await submitAnswer({ content: data.content, questionId, userId, upVote: 0, downVote: 1 });
        console.log(result);
        if (result.success) {
            location.reload();
        }
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
            <Button type="submit" className="" variant={"default"} size={"sm"}>
                Post Answer
            </Button>
        </form>
    );
}
