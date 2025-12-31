import mongoose, { Schema, model } from "mongoose";

const quizSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean },
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || model("Quiz", quizSchema);

export default Quiz;
