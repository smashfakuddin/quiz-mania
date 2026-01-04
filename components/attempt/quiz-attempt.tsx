"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Question = {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
};

export default function QuizAttempt({
  questions,
  quizId,
}: {
  questions: Question[];
  quizId: string;
}) {
  console.log("que", questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timer, setTimer] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    if (!timerActive) setTimerActive(true);
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  useEffect(() => {
    if (!timerActive || showSummary) return;
    if (timer <= 0) {
      setShowSummary(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer, showSummary]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const correctCount = Object.entries(answers).reduce(
    (acc, [qIndex, ansIndex]) => {
      const question = questions[Number(qIndex)];
      return question.options[ansIndex] === question.correctAnswer
        ? acc + 1
        : acc;
    },
    0
  );

  const submitQuiz = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "64b8f2a9c1a4e8b9d1f0a123",
        quizId,
        answers: Object.entries(answers).map(([q, a]) => ({
          questionIndex: Number(q),
          selectedOption: a,
        })),
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        timeTaken: 300 - timer,
      }),
    });

    const response = await res.json();
    console.log("response", response);

    setShowSummary(true);
  } catch (error) {
    console.error(error);
  }
};


  /* ================= SUMMARY ================= */

  if (showSummary) {
    const data = [
      { name: "Correct", value: correctCount },
      { name: "Incorrect", value: questions.length - correctCount },
    ];
    const COLORS = ["#4ade80", "#f87171"];

    return (
      <div className="max-w-2xl mx-auto mt-10">
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Quiz Summary</h2>
          </CardHeader>

          <CardContent className="flex flex-col items-center space-y-5">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    label
                  >
                    {data.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center space-y-2">
              <p>Total Questions: {questions.length}</p>
              <p>Correct Answers: {correctCount}</p>
              <p>Time Taken: {formatTime(300 - timer)}</p>
            </div>
          </CardContent>

          <CardFooter className="justify-center">
            <Button onClick={() => window.location.reload()}>
              Retake Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  /* ================= QUIZ ================= */

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>⏱ {formatTime(timer)}</span>
          </div>
          <Progress value={progress} />
        </CardHeader>

        <CardContent className="space-y-5">
          <h2 className="text-lg md:text-xl font-semibold">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-md border text-left transition ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            Previous
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button
              disabled={answers[currentIndex] === undefined}
              onClick={submitQuiz}
            >
              Submit
            </Button>
          ) : (
            <Button
              disabled={answers[currentIndex] === undefined}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
