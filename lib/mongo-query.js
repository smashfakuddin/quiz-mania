"use server";
import { NextResponse } from "next/server";
import Quiz from "../models/quiz-model";
import dbConnect from "./mongodb";

export async function getAllQuiz() {
  try {
    await dbConnect();

    const quizzes = await Quiz.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: quizzes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ALL QUIZZES ERROR:", error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
