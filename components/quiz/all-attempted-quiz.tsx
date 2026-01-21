import { getPreviousAttemptedQuiz } from "@/lib/mongo-query";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AllAttempTedQuiz() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const quizzes = await getPreviousAttemptedQuiz(session?.user?.id);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
      {quizzes.map((quiz) => (
        <Card className=" hover:scale-[102%] transition-all duration-300">
          <div className="flex">
            <div>
              <img src="/image/404-computer.svg" alt="" className="w-52" />
            </div>
            <div className=" space-y-3">
              <h3 className="text-2xl font-semibold">{quiz.title}</h3>
              <p>{quiz.description}</p>
              <Button>Continue</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
