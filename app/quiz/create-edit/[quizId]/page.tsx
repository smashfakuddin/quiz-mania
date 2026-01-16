import AllQuestions from "@/components/admin/all-question";
import CreateQuestion from "@/components/admin/create/create-question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/quiz/${quizId}`);
  const data = await res.json();

  if (!data) {
    return <div>Not Found</div>;
  }

  const { data: quiz } = data;

  return (
    <div className=" space-y-5">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold">
                {quiz.title}
              </CardTitle>
            </div>
            <CreateQuestion quizId={quiz._id} />
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

      <AllQuestions quizId={quizId} />
    </div>
  );
}
