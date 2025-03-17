"use client";
import { AskQuestionForm } from "./form";
import { createQuestion } from "./action";
// import { AnswerForm } from "./answer-form";

export default function Page() {
  return (
    <div className="mx-12 mt-6 flex flex-col gap-4">
      <span className="text-4xl font-bold">Ask your question.</span>
      <AskQuestionForm />
    </div>
  );
}

// export function Answer() {
//   const MyComponent = () => {
//     const handleSubmit = (data: { answer: string }) => {
//       // handle the answer submission here
//       console.log("Answer submitted:", data.answer);
//     };

//     return (
//       <div>
//         <AnswerForm onSubmit={handleSubmit} />
//       </div>
//     );
//   };
// }
