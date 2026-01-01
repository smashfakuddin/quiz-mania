// CreateQuizModal.tsx (Client)
"use client";

import { CommonModal } from "@/components/common/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateQuizForm } from "./create-quiz-form";
import { Button } from "@/components/ui/button";
import { EditIcon, Plus } from "lucide-react";

type EditProps = {
  isEdit: boolean;
  title: string;
  description: string;
  id: string;
};
export default function EditQuiz({
  isEdit,
  title,
  description,
  id,
}: EditProps) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button size="sm" onClick={handleOpenChange} variant="secondary">
        <EditIcon className="mr-1 h-4 w-4" />
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
          <CreateQuizForm
            onSuccess={handleOpenChange}
            isEdit={isEdit}
            title={title}
            description={description}
            id={id}
          />
        </CommonModal>
      )}
    </>
  );
}
