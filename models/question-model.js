import mongoose, { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    questionText: { type: String, required: true },
    note: { type: String, trim: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    marks: { type: Number, default: 1 },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  },
  { timestamps: true }
);

const Question = mongoose.models.Question || model("Question", questionSchema);

export default Question;
