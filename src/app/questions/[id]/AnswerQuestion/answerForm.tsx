"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { submitAnswer } from "./action-answer";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, List, UnderlineIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlock from "@tiptap/extension-code-block";


const answerSchema = z.object({
  content: z.string().min(10, "Answer must be at least 10 characters"),
  questionId: z.string(),
  userId: z.string(),
  upVote: z.number().optional(),
  downVote: z.number().optional(),
});

export function AnswerForm({
  questionId,
  userId,
}: {
  questionId: string;
  userId: string;
}) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
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
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
        codeBlock: false,
      }),
      Underline,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 text-white font-mono p-2 rounded-md overflow-x-auto',
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
    },
  });

  const onSubmit = async (data: { content: string }) => {
    const result = await submitAnswer({
      content: data.content,
      questionId,
      userId,
      upVote: 0,
      downVote: 1,
    });
    console.log(result);
    if (result.success) {
      location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border p-4 rounded-md"
    >
      <h2 className="text-lg font-semibold">Your Answer</h2>
      {!editor ? (
        <p>Loading editor...</p>
      ) : (
        <div className="border rounded-md">
          <div className="flex gap-2 items-center border-b p-2">
            <Toggle
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              value="strikethrough"
              aria-label="Toggle strikethrough"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
              value="strikethrough"
              aria-label="Toggle list"
              onClick={() => {
                editor?.chain().focus().toggleBulletList().run();
              }}
            >
              <List className="h-4 w-4" />
            </Toggle>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
            >
              {"</>"}
            </Button>
          </div>
          <EditorContent editor={editor} className="min-h-64 p-4" />
        </div>
      )}

      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}
      <Button type="submit" className="" variant={"default"} size={"sm"}>
        Post Answer
      </Button>
    </form>
  );
}
