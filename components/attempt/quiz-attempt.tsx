"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const questions: Question[] = [
  { id: 1, question: "Which hook is used to manage state in React?", options: ["useEffect", "useContext", "useState", "useMemo"], correctIndex: 2 },
  { id: 2, question: "What does Next.js use for routing?", options: ["Redux", "File-based routing", "React Router", "Express"], correctIndex: 1 },
  { id: 3, question: "Which CSS framework is utility-first?", options: ["Bootstrap", "Material UI", "Tailwind CSS", "Ant Design"], correctIndex: 2 },
  { id: 4, question: "Which method is used to fetch data on the client?", options: ["getStaticProps", "getServerSideProps", "fetch()", "useLoader"], correctIndex: 2 },
  { id: 5, question: "Which hook runs side effects in React?", options: ["useMemo", "useEffect", "useState", "useRef"], correctIndex: 1 },
];

export default function QuizAttempt() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timer, setTimer] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    if (!timerActive) setTimerActive(true);
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  useEffect(() => {
    if (!timerActive || showSummary) return;
    if (timer <= 0) {
      setShowSummary(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer, showSummary]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const correctCount = Object.entries(answers).reduce((acc, [qId, ansIndex]) => {
    const question = questions.find((q) => q.id === Number(qId));
    return question && question.correctIndex === ansIndex ? acc + 1 : acc;
  }, 0);

  if (showSummary) {
    const data = [
      { name: "Correct", value: correctCount },
      { name: "Incorrect", value: questions.length - correctCount },
    ];
    const COLORS = ["#4ade80", "#f87171"]; // green, red

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
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg">Total Questions: {questions.length}</p>
              <p className="text-lg">Correct Answers: {correctCount}</p>
              <p className="text-lg">Time Taken: {formatTime(300 - timer)}</p>
            </div>
          </CardContent>

          <CardFooter className="justify-center">
            <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
          <h2 className="text-lg md:text-xl font-semibold">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-md border transition
                    ${isSelected ? "border-primary bg-primary/10" : "hover:border-primary"}`}
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
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Previous
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button
              disabled={answers[currentQuestion.id] === undefined}
              onClick={() => setShowSummary(true)}
            >
              Submit
            </Button>
          ) : (
            <Button
              disabled={answers[currentQuestion.id] === undefined}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
