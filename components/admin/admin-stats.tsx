import { auth } from "@/auth";
import SummaryCard from "./summary-card";

export default async function AdminStats() {
  const session = await auth();
  const userId = session?.user?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/quiz?userId=${userId}`);
  const quizzes = await res.json();
  const { data: { dashboard } = {} } = quizzes || {};
  const { published, unpublished, totalQuestion, totalQuiz } = dashboard||{};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <SummaryCard title="Total Created Quiz" link="/quiz" amount={totalQuiz} />
      <SummaryCard title="Total Question" link="/quiz" amount={totalQuestion} />
      <SummaryCard title="Draft Quiz" link="/quiz" amount={unpublished} />
      <SummaryCard title="Published Quiz" link="/quiz" amount={published} />
    </div>
  );
}
