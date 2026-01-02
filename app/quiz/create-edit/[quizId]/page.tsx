import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const res = await fetch(`http://localhost:3000/api/quiz/${quizId}`);
  const data = await res.json();

  if (!data) {
    return <div>Not Found</div>;
  }

  const { data: quiz } = data;

  return (
    <div>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold">
                {quiz.title}
              </CardTitle>
            </div>
            {/* <CreateQuiz /> */}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{quiz.description}</p>

          {/* Optional quick stat */}
          <div className="text-sm">
            <span className="font-medium">{quiz.questions.length}</span>{" "}
            Question created Yet
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
