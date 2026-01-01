
"use client"
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

type DeleteQuizProps = {
  id: string;
  handleDeleteQuiz: (id: string) => {};
};
export default function DeleteQuiz({ id, handleDeleteQuiz }: DeleteQuizProps) {
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
