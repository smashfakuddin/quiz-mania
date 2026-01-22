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
      { status: 200 },
    );
  } catch (error) {
    console.error("GET ALL QUIZZES ERROR:", error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}

export async function getLastAttemptedQuiz(userId) {
  await dbConnect();
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
export async function getPreviousAttemptedQuiz(userId) {
  await dbConnect();

  const data = await Attempt.find({ userId })
    .sort({ createdAt: -1 })
    .skip(1)
    .populate({
      path: "quizId",
      select: "title description",
    })
    .select("quizId status")
    .lean();

  if (!data || data.length === 0) return [];

  return data.map((item) => ({
    quizId: item.quizId._id.toString(),
    title: item.quizId.title,
    description: item.quizId.description,
    status: item.status,
  }));
}
export async function getAttemptSummary(userId) {
  await dbConnect();

  const attempts = await Attempt.find({ userId }).lean();

  // ---- BUILD LAST 6 MONTHS TEMPLATE ----
  const lastSixMonths = [];
  const monthlyStats = {};

  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);

    const monthKey = date.toLocaleString("default", { month: "long" });

    lastSixMonths.push(monthKey);
    monthlyStats[monthKey] = {
      totalQuestions: 0,
      correctAnswers: 0,
    };
  }

  let totalQuestions = 0;
  let correctAnswers = 0;
  let totalTime = 0;

  const correctVsWrong = { correct: 0, wrong: 0 };
  const perQuizScores = [];

  // ---- PROCESS ATTEMPTS ----
  for (const attempt of attempts) {
    totalQuestions += attempt.totalQuestions;
    correctAnswers += attempt.correctAnswers;
    totalTime += attempt.timeTaken;

    correctVsWrong.correct += attempt.correctAnswers;
    correctVsWrong.wrong += attempt.totalQuestions - attempt.correctAnswers;

    const attemptMonth = new Date(attempt.createdAt).toLocaleString("default", {
      month: "long",
    });

    // Only count if within last 6 months
    if (monthlyStats[attemptMonth]) {
      monthlyStats[attemptMonth].totalQuestions += attempt.totalQuestions;
      monthlyStats[attemptMonth].correctAnswers += attempt.correctAnswers;
    }

    perQuizScores.push({
      quizId: attempt.quizId.toString(),
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
    });
  }

  // ---- BUILD LINE CHART DATA (ALWAYS 6 MONTHS) ----
  const attemptsOverTime = lastSixMonths.map((month) => {
    const { totalQuestions, correctAnswers } = monthlyStats[month];
    const accuracy = totalQuestions
      ? (correctAnswers / totalQuestions) * 100
      : 0;

    return {
      month,
      total: Number(accuracy.toFixed(2)),
    };
  });

  const overallAccuracy = totalQuestions
    ? (correctAnswers / totalQuestions) * 100
    : 0;

  return {
    totalAttempts: attempts.length,
    totalQuestions,
    correctAnswers,
    wrongAnswers: totalQuestions - correctAnswers,
    accuracy: Number(overallAccuracy.toFixed(2)),
    totalTime,
    attemptsOverTime, // 👈 exactly 6 months
    correctVsWrong,
    perQuizScores,
  };
}
