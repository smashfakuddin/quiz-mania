"use server";
import { NextResponse } from "next/server";
import Quiz from "../models/quiz-model";
import dbConnect from "./mongodb";
import Attempt from "@/models/attempt-model";

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

export async function getLastAttemptedQuiz(userId) {
  const data = await Attempt.findOne({ userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "quizId",
      select: "title description",
    })
    .select("quizId status")
    .lean();

  if (!data) return null;

  return {
    quizId: data.quizId._id.toString(),
    title: data.quizId.title,
    description: data.quizId.description,
    status: data.status,
  };
}

export async function getAttemptSummary(userId) {
  // fetch all attempts
  const attempts = await Attempt.find({ userId }).lean();

  if (!attempts.length) {
    return {
      totalAttempts: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      accuracy: 0,
      totalTime: 0,
      attemptsOverTime: [], // for line chart
      correctVsWrong: {}, // for donut chart
      perQuizScores: [], // for bar chart
    };
  }

  let totalQuestions = 0;
  let correctAnswers = 0;
  let totalTime = 0;
  const attemptsOverTime = []; // for line chart (time vs score)
  const perQuizScores = []; // for bar chart
  const correctVsWrong = { correct: 0, wrong: 0 }; // for donut chart

  for (const attempt of attempts) {
    totalQuestions += attempt.totalQuestions;
    correctAnswers += attempt.correctAnswers;
    totalTime += attempt.timeTaken;
    correctVsWrong.correct += attempt.correctAnswers;
    correctVsWrong.wrong += attempt.totalQuestions - attempt.correctAnswers;

    attemptsOverTime.push({
      date: attempt.createdAt,
      score: attempt.score,
    });

    perQuizScores.push({
      quizId: attempt.quizId.toString(),
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
    });
  }

  const accuracy = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0;

  return {
    totalAttempts: attempts.length,
    totalQuestions,
    correctAnswers,
    wrongAnswers: totalQuestions - correctAnswers,
    accuracy: parseFloat(accuracy.toFixed(2)), // as percentage
    totalTime, // in seconds
    attemptsOverTime, // line chart: [{date, score}]
    correctVsWrong, // donut chart
    perQuizScores, // bar chart
  };
}
