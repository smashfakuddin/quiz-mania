"use server";
import { revalidatePath } from "next/cache";

type FormValues = {
  title: string;
  description: string;
};

export async function createQuiz(data: FormValues) {
  const newData = {
    ...data,
    createdBy: "64a1b2c3d4e5f67890123456",
  };

  const res = await fetch("http://localhost:3000/api/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!res.ok) {
    throw new Error("Failed to create quiz");
  }

  const response = await res.json();
  revalidatePath("/admin");
  return response;
}

export async function deleteQuiz(id: string) {
  const res = await fetch("http://localhost:3000/api/quiz", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new Error("Unable To Delete");
  }

  const response = await res.json();
  revalidatePath("/admin");
  return { message: "Quiz deleted successfully" };
}
