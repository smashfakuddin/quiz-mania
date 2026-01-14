// CreateQuizModal.tsx (Client)
"use client";

import { CommonModal } from "@/components/common/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateQuizForm } from "./create-quiz-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default  function CreateQuiz() {
 const { data: session } = useSession()
 console.log('sesssion from create',session)
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button size="sm" onClick={handleOpenChange}>
        <Plus className="mr-1 h-4 w-4" />
        Create Quiz
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
          <CreateQuizForm onSuccess={handleOpenChange} isEdit={false} id={session?.user?.id}/>
        </CommonModal>
      )}
    </>
  );
}
