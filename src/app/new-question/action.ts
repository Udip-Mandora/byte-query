import { QuestionFormData } from "./form";
import { createNewQuestion } from "@/use-cases/question-service";

export async function createQuestion(data:QuestionFormData)
{
    // validate data 

    // pass that data to this function\

    try{
        const result = await createNewQuestion();
    }catch(error)
    {
        // handle error here ;
    }
}