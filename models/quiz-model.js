import mongoose, { Schema, model } from "mongoose";
import Question from "@/models/question-model"

const quizSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: false },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || model("Quiz", quizSchema);

export default Quiz;
