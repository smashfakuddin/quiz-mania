"use client";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { deleteQuiz } from "@/actions/create-quiz";
import { toast } from "sonner";

type DeleteQuizProps = {
  id: string;
};
export default function DeleteQuiz({ id }: DeleteQuizProps) {
  const handleDeleteQuiz = async (id: string) => {
    try {
      const res = await toast.promise(deleteQuiz(id), {
        loading: "Deleting quiz...",
        success: (data: any) => data?.message || "Quiz deleted successfully!",
        error: (err: any) => err?.message || "Failed to delete quiz",
      });
    } catch (error: any) {
      // toast.error(error?.message);
      console.log(error);
    }
  };
  return (
    <Button
      variant="secondary"
      size="icon"
      className="shrink mr-1 cursor-pointer"
      onClick={() => handleDeleteQuiz(id)}
    >
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
}
