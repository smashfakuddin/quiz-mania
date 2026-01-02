"use server";

import { revalidatePath } from "next/cache";

type QuestionFormValues = {
  questionText: string;
  note?: string;
  options: { value: string }[];
  correctAnswer: string;
  marks: number;
};
export async function addQuestion(data: QuestionFormValues, quizId: string) {
  const options = data.options.map((o) => o.value.trim());

  if (options.some((opt) => !opt)) {
    throw new Error("All Option Needed");
  }

  if (!options.includes(data.correctAnswer)) {
    throw new Error("Correct answer must match one of the options");
  }

  const payload = {
    quizId,
    questionText: data.questionText.trim(),
    note: data.note?.trim(),
    options,
    correctAnswer: data.correctAnswer,
    marks: Number(data.marks),
  };

  const res = await fetch("http://localhost:3000/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || "Failed to create question");
  }
  revalidatePath("/quiz");
  return result;
}
export async function deleteQuestion(id: string, quizId: string) {
  const res = await fetch("http://localhost:3000/api/question", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId: id, quizId }),
  });
  if (!res.ok) {
    throw new Error("Unable To Delete");
  }

  const response = await res.json();
  revalidatePath("/quiz");
  return response;
}
