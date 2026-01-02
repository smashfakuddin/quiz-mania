// CreateQuizModal.tsx (Client)
"use client";

import { CommonModal } from "@/components/common/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateQuizForm } from "./create-quiz-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateQuestionForm } from "./create-question-form";

export default function CreateQuestion({ quizId }: { quizId: string }) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button size="sm" onClick={handleOpenChange}>
        <Plus className="mr-1 h-4 w-4" />
        Create Question
      </Button>
      {open && (
        <CommonModal
          open={open}
          onOpenChange={() => {
            setOpen(false);
          }}
          title="Create Quiz"
          description="Creating Quiz will increase your reach in Community"
        >
          <CreateQuestionForm quizId={quizId} onSuccess={handleOpenChange} />
        </CommonModal>
      )}
    </>
  );
}
