import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/quiz-model";
import { NextResponse } from "next/server";

type Params = {
  params: {
    quizId: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();

    const { quizId } = await params;
    const quiz = await Quiz.findById(quizId).populate({
      path: "questions",
      select: "questionText note options marks",
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: quiz }, { status: 200 });
  } catch (error) {
    console.error("GET SINGLE QUIZ ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
