// CreateQuizModal.tsx (Client)
"use client";

import { CommonModal } from "@/components/common/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateQuizForm } from "./create-quiz-form";

export default function CreateQuiz() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const handleOpenChange = () => {
    router.back();
    setOpen(false);
  };
  return (
    <CommonModal
      open={open}
      onOpenChange={() => {
        router.back();
        setOpen(false);
      }}
      title="Create Quiz"
      description="Creating Quiz will increase your reach in Community"
    >
      <CreateQuizForm onSuccess={handleOpenChange} />
    </CommonModal>
  );
}
