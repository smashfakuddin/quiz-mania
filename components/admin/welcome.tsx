import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateQuiz from "./create/create-quiz";
import { auth } from "@/auth";

type WelcomeCardProps = {
  name: string | null | undefined;
  role?: string;
  totalQuizzes?: number;
};

export async function Welcome({
  name,
  role = "Admin",
  totalQuizzes = 0,
}: WelcomeCardProps) {
const session = await auth();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Welcome back, {name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
          <CreateQuiz id={session?.user?.id}/>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          You are logged in as{" "}
          <span className="font-medium text-foreground">{role}</span>. Manage
          quizzes, questions, and monitor overall activity from here.
        </p>

        {/* Optional quick stat */}
        <div className="text-sm">
          <span className="font-medium">{totalQuizzes}</span> quizzes created
        </div>
      </CardContent>
    </Card>
  );
}
