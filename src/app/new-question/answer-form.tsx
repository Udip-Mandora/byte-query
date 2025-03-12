"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const answerSchema = z.object({
    answer: z.string().min(10, "Answer must be at least 10 characters"),
});

export function AnswerForm({ onSubmit }: { onSubmit: (data: { answer: string }) => void }) {
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<{ answer: string }>({
        resolver: zodResolver(answerSchema),
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        onUpdate: ({ editor }) => {
            setValue("answer", editor.getHTML());
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!editor ? (
                <p>Loading editor...</p>
            ) : (
                <>
                    <div>
                        <label className="block text-sm font-medium">Your Answer</label>
                        <div className="border p-2 rounded-md">
                            <EditorContent editor={editor} className="min-h-[150px]" />
                        </div>
                        {errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>}
                    </div>
                    <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Post Answer
                    </Button>
                </>
            )}
        </form>
    );
}