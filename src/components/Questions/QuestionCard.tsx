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
  key,
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
  key: string;
}) {
  console.log(question.asker.image);
  return (
    <Card key={key}>
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
        <CardDescription>{question.content}</CardDescription>
        <CardContent></CardContent>
        <CardFooter className="flex flex-col space-y-1 w-full">
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
