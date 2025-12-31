import AdminStats from "@/components/admin/admin-stats";
import AllQuiz from "@/components/admin/all-quizz";
import { Welcome } from "@/components/admin/welcome";

export default function page() {
  return (
    <div className="my-5 space-y-5">
      <Welcome name="S.M. Ashfak Uddin" />
      <AdminStats />
      <AllQuiz />
    </div>
  );
}
