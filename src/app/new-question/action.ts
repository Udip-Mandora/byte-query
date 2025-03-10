import { QuestionFormData } from "./form";
import { createNewQuestion } from "@/use-cases/question-service";

export async function createQuestion(data: QuestionFormData) {
    // validate data 
    if (!data.title || !data.description) {
        throw new Error("Title and content are required.");
    }

    // pass that data to this function\
    try {
        const result = await createNewQuestion(data.title, data.description);
        return result;
    } catch (error) {
        // handle error here
        console.error("Error creating question: ", error);
        throw new Error("Failed to create question");
    }
}