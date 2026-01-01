"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createQuiz } from "@/actions/create-quiz";

type FormValues = {
  title: string;
  description: string;
};

export function CreateQuizForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createQuiz(data);
      console.log("respnse", response);
      toast.success(response?.message);

      onSuccess();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title">Title of the Quiz</Label>
        <Input
          id="title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Write a description</Label>
        <Input
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
