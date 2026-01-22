import { getAttemptSummary, getLastAttemptedQuiz } from "@/lib/mongo-query";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChartBar } from "./bar-chart";
import { ChartLine } from "./line-chart";
import { ChartRadial } from "./radal-chart";
import { auth } from "@/auth";

export default async function Summary() {
  const session = await auth();
  if (!session?.user) {
    return <>not auth</>;
  }
  const data = await getLastAttemptedQuiz(session?.user?.id);
  const summary = await getAttemptSummary(session?.user?.id);

  console.log(summary);
  return (
    <div>
      <Card>
        <CardHeader className="text-xl font-semibold">
          Check Your Performance over the time
        </CardHeader>
        <CardContent className="flex md:flex-row flex-col gap-5 p-4">
          <ChartRadial total={summary?.accuracy} />
          <ChartBar
            total={summary?.totalQuestions}
            right={summary.correctAnswers}
            wrong={summary?.wrongAnswers}
          />
          <ChartLine chartData={summary?.attemptsOverTime}/>
        </CardContent>
      </Card>
    </div>
  );
}
