import mongoose, { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    questionText: { type: String, required: true },
    note: { type: String, trim: true },
    options: {
      type: [String],
      validate: {
        validator: (v) => v.length === 4,
        message: "Exactly 4 options are required",
      },
      required: true,
    },
    correctAnswer: { type: String, required: true },
    marks: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Question = mongoose.models.Question || model("Question", questionSchema);

export default Question;
