
import { redirect } from "next/navigation";
import { QuestionFormData } from "../../../new-question/form";
import { createNewQuestion } from "@/use-cases/question-service";
import {z} from "zod";
import { questionSchema } from "../../../new-question/form";

export async function createQuestion(data: QuestionFormData) {
  // validate data
   // Validate using Zod
   const parsed = questionSchema.safeParse(data);
   if (!parsed.success) {
     return { error: parsed.error.format() }; // Return structured validation errors
   }
  // pass that data to this function\
  try {
    const result = await createNewQuestion(data.title, data.description);
    if (result.id) {
        return { redirectUrl: "/" };
    }
  } catch (error) {
    // handle error here
    console.error("Error creating question: ", error);
    // throw new Error("Failed to create question");
  }
}
