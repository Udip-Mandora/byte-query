import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function AnswerCard({
  answer,
}: {
  answer: {
    id: string;
    content: string | null;
    userId: string;
    upVote: number;
    downVote: number;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
}) {
  return (
    <Card className="flex flex-col gap-1 p-2">
      <CardContent>{answer.content}</CardContent>
      <CardFooter className="flex flex-col space-y-1 w-full">
        <span className="flex items-center justify-between text-xs font-medium w-full">
          <span>{answer.createdAt?.toLocaleString()}</span>
          <span className="flex gap-1 items-center text-xs">
            <Button className="" size={"sm"} variant={"ghost"}>
              <ThumbsUp className="size-4" />
              {answer.upVote}
            </Button>
            <Button className="" size={"sm"} variant={"ghost"}>
              <ThumbsDown className="size-4" />
              {answer.downVote}
            </Button>
          </span>
        </span>
      </CardFooter>
    </Card>
  );
}
