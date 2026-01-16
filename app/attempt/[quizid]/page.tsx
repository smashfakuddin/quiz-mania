import { auth } from "@/auth";
import QuizAttempt from "@/components/attempt/quiz-attempt";

export default async function page({
  params,
}: {
  params: Promise<{ quizid: string }>;
}) {
  const { quizid } = await params;
  const session = await auth();
  console.log(quizid);
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/quiz/${quizid}`);
  const quiz = await res.json();
console.log(quiz)
  return (
    <div>
      <QuizAttempt questions={quiz.data.questions} quizId={quiz.data._id} userId={session?.user?.id}/>
    </div>
  );
}
