import { NextRequest, NextResponse } from "next/server";

import Question from "@/models/question-model";
import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/quiz-model";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { questionText, note, options, correctAnswer, marks, quizId } = body;

    if (
      !questionText ||
      !options ||
      options.length !== 4 ||
      quizId === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "Required fields missing or invalid" },
        { status: 400 }
      );
    }

    const question = await Question.create({
      questionText,
      note,
      options,
      correctAnswer,
      marks,
    });

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    quiz.questions.push(question._id);
    await quiz.save();

    return NextResponse.json(
      { success: true, data: question },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, questionText, note, options, correctAnswer, marks } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Question ID is required" },
        { status: 400 }
      );
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      {
        questionText,
        note,
        options,
        correctAnswer,
        marks,
      },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedQuestion },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { questionId,quizId } = body;

    if (!questionId || !quizId) {
      return NextResponse.json(
        { success: false, message: "Question ID and Quiz Id is required" },
        { status: 400 }
      );
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    await Quiz.findByIdAndUpdate(quizId, {
      $pull: { questions: question._id },
    });

    await Question.findByIdAndDelete(questionId);

    return NextResponse.json(
      { success: true, message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
