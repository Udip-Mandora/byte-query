// import { redirect } from "next/navigation";
// import { AnswerForm } from "./answer-form";
// import { answerSchema } from "./answer-form";

// export async function createAnswer(data: AnswerForm){
//     const parsed = answerSchema.safeParse(data);
//     if(!parsed.success){
//         return {error: parsed.error.format()}; // Return Structured Validation
//     }
//     //pass that data to this function\
//     try{
//         const result = await createAnswer()
//     }
// }