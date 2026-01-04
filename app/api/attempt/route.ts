import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Attempt from "@/models/attempt-model";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const attempt = await Attempt.create({
      userId: body.userId,
      quizId: body.quizId,
      answers: body.answers,
      correctAnswers: body.correctAnswers,
      score: body.correctAnswers,
      totalQuestions: body.totalQuestions,
      timeTaken: body.timeTaken,
    });

    return NextResponse.json(
      { success: true, data: attempt },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
