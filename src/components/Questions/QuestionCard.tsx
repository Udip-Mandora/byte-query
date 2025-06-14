import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Key } from "react";
import Link from "next/link";

/**
 * Displays a question in a formatted card .
 * @param {string} title  title of the question.
 * @param {string} content  actual detailed question.
 * @param {string} tags  list of tags .
 * @param {string} upVotes  no of up votes.
 * @param {string} downVotes  no of down votes.
 * @param {string} noOfAnswers  no of answers.
 * @param {string} userName  username of the user who posted the question.
 * @param {string} date  date when question was asked .
 *
 * @returns a card that with formatted data.
 * */
export default function QuestionCard({
  question,
}: {
  question: {
    createdAt: Date | null;
    updatedAt: Date | null;
    id: string;
    content: string;
    title: string;
    userId: string;
    tags: {
      tag: {
        name: string;
      };
    }[];
    asker: {
      name: string;
      image: string | null;
    };
  };
}) {
  return (
    <Card className="max-w-4xl w-full">
      <CardHeader>
        <Link href={`/questions/${question.id}`}>
          <CardTitle>{question.title}</CardTitle>
        </Link>
        <CardDescription>{question.content.slice(0,150)}</CardDescription>
        <CardFooter className="flex flex-col space-y-1 w-full px-0 pt-1">
          <span className="flex items-center justify-between text-sm font-medium w-full">
            <span>{question.createdAt?.toLocaleString()}</span>
            <span className="flex gap-1 items-center">
              <Avatar className="size-5 flex">
                {question.asker.image && (
                  <AvatarImage src={question.asker.image} alt="User Image" />
                )}
                <AvatarFallback className="size-5">
                  {question.asker.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="flex ">{question.asker.name}</span>
            </span>
          </span>
          <span className="flex items-center justify-start w-full">
            {question.tags.length > 0 &&
              question.tags.map((tag) => (
                <Badge key={tag.tag.name}>{tag.tag.name}</Badge>
              ))}
          </span>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
