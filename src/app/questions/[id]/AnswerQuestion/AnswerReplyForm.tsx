"use client";

import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAllAnswerReplies } from "@/use-cases/answer-reply-service";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { createAnswerReplyFunction } from "./action-answer-reply";

export function AnswerReplyForm({
    answerId,
    onSuccess,
}: {
    answerId: string;
    onSuccess: () => void;
}) {
    const [reply, setReply] = useState("");
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = () => {
        if (!session?.user?.id) {
            console.error("You must be logged in to reply.");
            return;
        }

        if (!reply.trim()) return;

        startTransition(() => {
            createAnswerReplyFunction({
                userId: session.user.id,
                answerId,
                content: reply.trim(),
            })
                .then(() => {
                    setReply("");
                    onSuccess(); // Refresh the replies
                })
                .catch((error) => {
                    console.error("Failed to submit reply:", error);
                });
        });
    };

    return (
        <div className="w-full flex flex-col gap-2 mt-2">
            <Textarea
                placeholder="Write a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={2}
                className="w-full text-sm"
                disabled={isPending}
            />
            <div className="flex justify-end">
                <Button size="sm" onClick={handleSubmit} disabled={isPending || !reply.trim()}>
                    {isPending ? "Replying..." : "Reply"}
                </Button>
            </div>
        </div>
    );
}
