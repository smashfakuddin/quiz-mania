import mongoose, { Schema, Types } from "mongoose";


const AttemptSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    quizId: {
      type: Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    score: {
      type: Number, // can be same as correctAnswers or marks-based
      required: true,
    },

    timeTaken: {
      type: Number, // in seconds
      required: true,
    },

    answers: [
      {
        questionIndex: Number,
        selectedOption: Number,
      },
    ],

    status: {
      type: String,
      enum: ["completed", "timeout"],
      default: "completed",
    },

    attemptNumber: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Attempt ||
  mongoose.model("Attempt", AttemptSchema);
