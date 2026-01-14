"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createQuiz, editQuiz } from "@/actions/create-quiz";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  title: string;
  description: string;
};

type CreateQuizProps = {
  title?: string;
  description?: string;
  id: string | undefined;
  isEdit: boolean;
  onSuccess: () => void;
};
export function CreateQuizForm({
  onSuccess,
  title,
  description,
  id,
  isEdit,
}: CreateQuizProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await toast.promise(
        isEdit ? editQuiz(id, data) : createQuiz(data,id), // your async call
        {
          loading: isEdit ? "Updating quiz..." : "Creating quiz...",
          success: (res: any) => res?.message || "Success!",
          error: (err: any) => err?.message || "Something went wrong",
        }
      );

      onSuccess();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (isEdit && title && description) {
      reset({
        title,
        description,
      });
    }
  }, [isEdit, title, description, reset]);

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
        <Textarea
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
        {isSubmitting ? "Saving..." : isEdit ? "Save Edit" : "Save"}
      </Button>
    </form>
  );
}
