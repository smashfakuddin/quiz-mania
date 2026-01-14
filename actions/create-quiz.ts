"use server";
import { revalidatePath } from "next/cache";

type FormValues = {
  title: string;
  description: string;
};

export async function createQuiz(data: FormValues, id: string | undefined) {
  const newData = {
    ...data,
    createdBy: id,
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
export async function editQuiz(id: string | undefined, data: FormValues) {
  const newData = {
    ...data,
    id,
  };

  const res = await fetch("http://localhost:3000/api/quiz", {
    method: "PATCH",
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

export async function togglePublishQuiz(
  quizId: string,
  isPublished: boolean
) {
  const res = await fetch("http://localhost:3000/api/quiz", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: quizId,
      isPublished,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update publish status");
  }

  const data = await res.json();
  revalidatePath("/admin");
  return data;
}
