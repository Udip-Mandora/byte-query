"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { voteOnAnswer } from "@/app/questions/[id]/AnswerQuestion/action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { voteOnAnswerAction } from "@/use-cases/vote-serices";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { AnswerReplyForm } from "@/app/questions/[id]/AnswerQuestion/AnswerReplyForm";

export default function AnswerCard({
  answer,
}: {
  answer: {
    id: string;
    content: string | null;
    userId: string;
    upVote: number;
    downVote: number;
    replies: {
      id: string;
      userId: string;
      answerId: string;
      content: string;
      createdAt: Date | null;
      updatedAt: Date | null;
    }[];

    createdAt: Date | null;
    updatedAt: Date | null;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleVote = (type: "up" | "down") => {
    if (!userId) {
      console.error("You must be logged in to vote.");
      return;
    }

    startTransition(() => {
      voteOnAnswerAction({
        answerId: answer.id,
        userId,
        voteType: type,
      })
        .then(() => {
          router.refresh(); //Refresh the UI with updated vote counts
        })
        .catch((error) => {
          console.error("Voting failed:", error);
        });
    });
  };

  return (
    <Card className="flex flex-col gap-1 p-2">
      <CardContent>{answer.content}</CardContent>
      <CardFooter className="flex flex-col space-y-1 w-full">
        <span className="flex items-center justify-between text-xs font-medium w-full">
          <span>{answer.createdAt?.toLocaleString()}</span>
          <span className="flex gap-1 items-center text-xs">
            <Button
              className=""
              size={"sm"}
              variant={"ghost"}
              onClick={() => handleVote("up")}
              disabled={isPending}
            >
              <ThumbsUp className="size-4" />
              {answer.upVote}
            </Button>
            <Button
              className=""
              size={"sm"}
              variant={"ghost"}
              onClick={() => handleVote("down")}
              disabled={isPending}
            >
              <ThumbsDown className="size-4" />
              {answer.downVote}
            </Button>
          </span>
        </span>

        {/* Replies list */}
        {answer.replies.length > 0 && (
          <div className="pl-3 border-l border-gray-200 dark:border-gray-700 space-y-2 mt-2">
            {answer.replies.map((reply) => (
              <div key={reply.id} className="text-sm text-muted-foreground">
                <p>{reply.content}</p>
                <span className="text-xs">
                  {new Date(reply.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reply form */}
        <AnswerReplyForm answerId={answer.id} onSuccess={refreshReplies} />
      </CardFooter>
    </Card>
  );
}
