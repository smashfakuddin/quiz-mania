"use client";
import { TrashIcon } from "lucide-react";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteQuestion } from "@/actions/question";

export default function DeleteQuestion({
  id,
  quizId,
}: {
  id: string;
  quizId: string;
}) {
  const handleDeleteQuestion = async (id: string) => {
    try {
      const response = await toast.promise(
        deleteQuestion(id, quizId), // your async delete function
        {
          loading: "Deleting question...",
          success: (res: any) => res?.message || "Question deleted!",
          error: (err: any) => err?.message || "Failed to delete question",
        }
      );
    } catch (error: any) {
      // toast.error(error?.message);
      console.log(error);
    }
  };

  return (
    <Button variant={"secondary"} onClick={() => handleDeleteQuestion(id)}>
      <TrashIcon className="size-4" />
    </Button>
  );
}
