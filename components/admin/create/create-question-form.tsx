"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addQuestion } from "@/actions/question";

type QuestionFormValues = {
  questionText: string;
  note?: string;
  options: { value: string }[];
  correctAnswer: string;
  marks: number;
};

type Props = {
  quizId: string;
  onSuccess: () => void;
};

export function CreateQuestionForm({ quizId, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormValues>({
    defaultValues: {
      questionText: "",
      note: "",
      options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      correctAnswer: "",
      marks: 1,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "options",
  });

  const watchedOptions = watch("options");

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      await toast.promise(
        addQuestion(data, quizId), // your async function
        {
          loading: "Adding question...",
          success: (res: any) => `${res.message}`, // what to show on success
          error: (err: any) => err.message || "Something went wrong", // on error
        }
      );

      reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Question */}
      <div>
        <Label>Question</Label>
        <Textarea
          {...register("questionText", { required: "Question is required" })}
        />
        {errors.questionText && (
          <p className="text-sm text-red-500">{errors.questionText.message}</p>
        )}
      </div>

      {/* Note */}
      <div>
        <Label>Note (optional)</Label>
        <Textarea {...register("note")} />
      </div>

      {/* Options */}
      <div className="space-y-2">
        <Label>Options (Exactly 4)</Label>
        {fields.map((field, index) => (
          <Input
            key={field.id}
            placeholder={`Option ${index + 1}`}
            {...register(`options.${index}.value`, {
              required: "Option is required",
            })}
          />
        ))}
      </div>

      {/* Correct Answer */}
      <div>
        <Label>Correct Answer</Label>
        <select
          {...register("correctAnswer", {
            required: "Correct answer is required",
          })}
          className="w-full border rounded p-2"
        >
          <option value="">Select correct option</option>
          {watchedOptions.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.value || `Option ${idx + 1}`}
            </option>
          ))}
        </select>
        {errors.correctAnswer && (
          <p className="text-sm text-red-500">{errors.correctAnswer.message}</p>
        )}
      </div>

      {/* Marks */}
      <div>
        <Label>Marks</Label>
        <Input
          type="number"
          min={1}
          {...register("marks", { valueAsNumber: true })}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Add Question"}
      </Button>
    </form>
  );
}
