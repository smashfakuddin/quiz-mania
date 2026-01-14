"use client";

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { togglePublishQuiz } from "@/actions/create-quiz";
import { toast } from "sonner";
import { useState } from "react";

export default function PublishQuiz({
  id,
  isPublished,
}: {
  id: string;
  isPublished: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);

      await togglePublishQuiz(id, !isPublished);

      toast.success(
        isPublished
          ? "Quiz unpublished successfully"
          : "Quiz published successfully"
      );
    } catch (error) {
      toast.error("Failed to update quiz status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-fit"
      variant="secondary"
      disabled={loading}
      onClick={handleToggle}
    >
      {loading
        ? "Updating..."
        : isPublished
        ? "Unpublish"
        : "Publish"}
      <Upload className="ml-2 h-4 w-4" />
    </Button>
  );
}
