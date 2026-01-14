import { auth } from "@/auth";
import AdminStats from "@/components/admin/admin-stats";
import AllQuiz from "@/components/admin/all-quizz";
import { Welcome } from "@/components/admin/welcome";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if(!session?.user){
    redirect("/")
  }
  return (
    <div className="my-5 space-y-5">
      <Welcome name={session?.user?.name} />
      <AdminStats />
      <AllQuiz />
    </div>
  );
}
